import {removeIndexFileFromPath} from "./removeIndexFileFromPath";
import {removeFileExtension} from "../fileSystem/removeFileExtension";
import {ensureStartsWith} from "../string/ensureStartsWith";
import {removeUnderscores} from "../string/removeUnderscores";
import {pipe} from "fp-ts/function";
import {DIR_PAGES} from "./constants";

export const getSitePathFromPagesDirectoryPath = (path: string): string => {
    return pipe(
        path.replace(DIR_PAGES, ""),
        /**
         * Index files are a special case where the site path slug
         * matches the name of the parent directory, and the
         * index file name does not need to be specified
         */
        removeIndexFileFromPath,
        removeFileExtension,
        ensureStartsWith("/"),
        removeUnderscores,
    );
};