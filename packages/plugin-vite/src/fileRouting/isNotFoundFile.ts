import {isTsFileWithName} from "../fileSystem/isTsFileWithName";

export const isNotFoundFile = (file: string) => isTsFileWithName(file, "_404");
