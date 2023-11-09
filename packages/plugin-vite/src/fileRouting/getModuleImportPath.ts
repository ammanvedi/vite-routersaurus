import {DIR_PROJECT_ROOT, PROJECT_ROOT_IMPORT_ALIAS} from "./constants";

export const getModuleImportPath = (filePath: string) => {
    return filePath.replace(DIR_PROJECT_ROOT, PROJECT_ROOT_IMPORT_ALIAS)
}