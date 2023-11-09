import { PluginOption } from "vite";
import {getRoutingTree} from "./fileRouting/getRoutingTree";
import {DIR_PAGES, PROJECT_ROOT_IMPORT_ALIAS} from "./fileRouting/constants";
import {createLazyRoutesSource} from "./codegen/createLazyRoutesSource";
import {createClientRoutingSource} from "./codegen/createClientRoutingSource";
import {getImportAllAsDeclaration} from "./ast/ts/getImportAllAsStatement";
import {getSourceString} from "./codegen/getSourceString";

import {join} from 'path'
import {createPreRenderedHTML} from "./codegen/createPreRenderedHTML";

const PLUGIN_NAME = 'vite-routersaurus'
const MODULE_ID = '@routersaurus/dom'
const VIRTUAL_MODULE_ID = `virtual:${MODULE_ID}`;
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

let distDir: string | null = null;

function virtualRoutes(): PluginOption {
    return {
        name: PLUGIN_NAME,
        closeBundle: async () => {

            if(!distDir) {
                throw new Error('Dist Dir not defined')
            }

            createPreRenderedHTML(DIR_PAGES, distDir)

        },
        config(config) {

            if(!config?.resolve?.alias) {
                config.resolve = {
                    ...(config?.resolve),
                    alias: {}
                }
            }


            config.resolve.alias = {
                ...config.resolve.alias,
                [MODULE_ID]: VIRTUAL_MODULE_ID,
                [PROJECT_ROOT_IMPORT_ALIAS]: process.cwd()
            }

            return config
        },
        configResolved: (config) => {
            distDir = join(config.root, config.build.outDir)
        },
        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID) {
                return RESOLVED_VIRTUAL_MODULE_ID;
            }
        },
        load(id) {

            if (id === RESOLVED_VIRTUAL_MODULE_ID) {
                /**
                 * Create a tree representation of the directory structure
                 */
                const routingTreeFromFileSystem = getRoutingTree(DIR_PAGES);
                /**
                 * Create all the lazy and eager components for all pages
                 */
                const lazyRoutes = createLazyRoutesSource(routingTreeFromFileSystem);

                /**
                 * Create the TS AST that represents the routing structure, this is passed to
                 * the app, the app can then implement the structure via whichever routing
                 * implementation it chooses
                 */
                const rawRoutingConfig = createClientRoutingSource(routingTreeFromFileSystem)
                const statements = [
                    getImportAllAsDeclaration("React", "react"),
                    ...lazyRoutes,
                    ...rawRoutingConfig,
                ];

                return getSourceString(statements);
            }
        },
    };
}

export function viteFileRouter(): PluginOption {
    return [virtualRoutes()];
}
