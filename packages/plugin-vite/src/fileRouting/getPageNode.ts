import {getSitePathFromPagesDirectoryPath} from "./getSitePathForFile";
import {DIR_PROJECT_ROOT} from "./constants";
import {generateModuleName, generateSuspenseModuleName} from "./generateModuleNameFromSitePath";
import {PageNode} from "./types";
import {getFrontMatter} from "./getFrontMatter";
import {isIndexFile} from "./isIndexFile";
import {getModuleImportPath} from "./getModuleImportPath";



export const getPageNode = (filePath: string): PageNode => {
    const sitePath = getSitePathFromPagesDirectoryPath(filePath);
    return {
        type: "page",
        index: isIndexFile(filePath),
        metadata: getFrontMatter(filePath),
        filesystemPath: filePath,
        sitePath,
        moduleImportPath: getModuleImportPath(filePath),
        generatedModuleName: generateModuleName(sitePath),
        generatedSuspenseModuleName: generateSuspenseModuleName(sitePath),
    };
};