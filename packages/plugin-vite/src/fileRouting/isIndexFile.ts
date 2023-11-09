import {isTsFileWithName} from "../fileSystem/isTsFileWithName";

export const isIndexFile = (file: string) => isTsFileWithName(file, "index");
