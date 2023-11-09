import {LoaderNode} from "./types";
import {getSitePathFromPagesDirectoryPath} from "./getSitePathForFile";
import {DIR_PROJECT_ROOT} from "./constants";
import {generateModuleName} from "./generateModuleNameFromSitePath";
import {getModuleImportPath} from "./getModuleImportPath";

export const getLoaderNode = (filePath: string): LoaderNode => {
    const sitePath = getSitePathFromPagesDirectoryPath(filePath);
    return {
        type: "loader",
        filesystemPath: filePath,
        moduleImportPath: getModuleImportPath(filePath),
        generatedImportName: generateModuleName(sitePath),
    };
};
