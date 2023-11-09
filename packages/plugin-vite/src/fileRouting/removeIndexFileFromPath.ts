import {isIndexFile} from "./isIndexFile";
import {removeFileFromPath} from "../fileSystem/removeFileNameFromPath";

export const removeIndexFileFromPath = (path: string) => {
    return isIndexFile(path) ? removeFileFromPath(path) : path;
};