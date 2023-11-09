import {isTsFileWithName} from "../fileSystem/isTsFileWithName";

export const isLayoutFile = (file: string) => isTsFileWithName(file, "_layout");
