import {join} from "path";

export const DIR_PROJECT_ROOT = process.cwd();
console.log('WD' + DIR_PROJECT_ROOT)
export const DIR_SRC = join(DIR_PROJECT_ROOT, "src");
export const DIR_PAGES = join(DIR_SRC, "pages");

console.log('DIR_PAGES', DIR_PAGES)

export const PROJECT_ROOT_IMPORT_ALIAS = '@virtual-routersaurus-import'