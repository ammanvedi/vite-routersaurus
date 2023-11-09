import {getSitePathFromPagesDirectoryPath} from "./getSitePathForFile";
import {LayoutNode} from "./types";
import {DIR_PROJECT_ROOT} from "./constants";
import {generateModuleName, generateSuspenseModuleName} from "./generateModuleNameFromSitePath";
import {getModuleImportPath} from "./getModuleImportPath";

export const getLayoutNode = (filePath: string): LayoutNode => {
    const sitePath = getSitePathFromPagesDirectoryPath(filePath);
    return {
        type: "layout",
        filesystemPath: filePath,
        moduleImportPath: getModuleImportPath(filePath),
        generatedModuleName: generateModuleName(sitePath),
        generatedSuspenseModuleName: generateSuspenseModuleName(sitePath),
    };
};