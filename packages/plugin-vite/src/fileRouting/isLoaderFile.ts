import {isTsFileWithName} from "../fileSystem/isTsFileWithName";

export const isLoaderFile = (file: string) => isTsFileWithName(file, "_loader");
