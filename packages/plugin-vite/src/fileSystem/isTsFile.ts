import {TsxFileName} from "./types";

export const isTsFile = (fileName: string): fileName is TsxFileName<string> => {
    return fileName.endsWith("ts") || fileName.endsWith("tsx");
};