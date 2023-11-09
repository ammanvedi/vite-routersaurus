import {join} from "path";

export const DIR_PROJECT_ROOT = process.cwd();
export const DIR_SRC = join(DIR_PROJECT_ROOT, "src");
export const DIR_PAGES = join(DIR_SRC, "pages");

export const PROJECT_ROOT_IMPORT_ALIAS = '@virtual-routersaurus-import'