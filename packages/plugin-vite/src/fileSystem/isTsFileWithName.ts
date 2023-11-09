import {TsxFileName} from "./types";
import {isTsFile} from "./isTsFile";
import { join, basename } from "path";

export const isTsFileWithName = (
    fileName: Readonly<string>,
    startsWith: string,
): fileName is TsxFileName<typeof fileName> => {
    return isTsFile(fileName) && basename(fileName).startsWith(startsWith);
};