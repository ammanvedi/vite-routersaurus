import {readdirSync} from "fs";
import {join} from "path";
import {pipe} from "fp-ts/function";
import {parseDirectory} from "./parseDirectory";
import {RoutingTree} from "./types";
import * as A from 'fp-ts/Array'
import {getSitePathFromPagesDirectoryPath} from "./getSitePathForFile";
import {getPageNode} from "./getPageNode";
import {getLayoutNode} from "./getLayoutNode";
import {getLoaderNode} from "./getLoaderNode";
import {getNotFoundNode} from "./getNotFoundNode";

export const getRoutingTree = (rootDirectoryPath: string): RoutingTree => {
    const {notFoundFilePath, indexFilePath, childDirectoryPaths, childPagePaths, layoutFilePath, loaderFilePath} =
        pipe(
            readdirSync(rootDirectoryPath),
            A.map(join.bind(null, rootDirectoryPath)),
            parseDirectory,
        );

    return {
        type: "directory",
        filesystemPath: rootDirectoryPath,
        sitePath: getSitePathFromPagesDirectoryPath(rootDirectoryPath),
        indexNode: indexFilePath ? getPageNode(indexFilePath) : null,
        layoutNode: layoutFilePath ? getLayoutNode(layoutFilePath) : null,
        loaderNode: loaderFilePath ? getLoaderNode(loaderFilePath) : null,
        notFoundNode: notFoundFilePath ? getNotFoundNode(notFoundFilePath) : null,
        children: [
            ...childPagePaths.map(getPageNode),
            ...childDirectoryPaths.map(getRoutingTree),
        ],
    };
};