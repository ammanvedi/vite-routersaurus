import {getRoutingTree} from "../fileRouting/getRoutingTree";
import {join} from "path";
import {readFileSync, writeFileSync} from "node:fs";
import {parseHtmlToAST} from "../ast/html/parseHtmlToAST";
import {addTitleToDocument} from "../ast/html/addTitleToDocument";
import {traverse} from "../tree/traverse";
import {RoutingTreeNode} from "../fileRouting/types";
import {pathContainsParameter} from "../string/pathContainsParameter";
import { mkdirp } from 'mkdirp'
import {toHtml} from 'hast-util-to-html'
import {pipe} from "fp-ts/function";
import {addMetaTagToDocument} from "../ast/html/addMetaTagToDocument";
import {clone} from "../object/clone";

export const createPreRenderedHTML = (
    pagesRoot: string,
    distRoot: string
) => {
    const tree = getRoutingTree(pagesRoot)
    const indexFilePath = join(distRoot, 'index.html')
    const indexContents = readFileSync(indexFilePath).toString()

    const indexAST = parseHtmlToAST(indexContents)


    traverse<RoutingTreeNode>(tree, null, (node) => {
        /**
         * We only need to handle directories that have index files and page nodes
         * We also ignore any path that contains parameters, since we cant do any
         * useful static rendering for these
         */
        const isPage = node.type === 'page'
        const isDirectoryWithIndex = (node.type === 'directory' && node.indexNode)

        if((isPage || isDirectoryWithIndex) && !pathContainsParameter(node.sitePath)  ) {

            const metaData = node.type === 'page' ? node.metadata : node.indexNode?.metadata || null

            const indexFile = pipe(
                clone(indexAST),
                addTitleToDocument(metaData?.title),
                addMetaTagToDocument('og:title', metaData?.tile),
                addMetaTagToDocument('og:image', metaData?.image),
                addMetaTagToDocument('og:description', metaData?.description),
            )

            const htmlFileDestination = join(distRoot, node.sitePath)
            mkdirp.sync(htmlFileDestination)
            writeFileSync(join(htmlFileDestination, 'index.html'), toHtml(indexFile))


        }
    })






}