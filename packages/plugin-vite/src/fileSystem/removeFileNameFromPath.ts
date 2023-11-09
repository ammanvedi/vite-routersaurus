import {basename} from "path";

export const removeFileFromPath = (path: string) => {
    return path.replace(basename(path), "");
};