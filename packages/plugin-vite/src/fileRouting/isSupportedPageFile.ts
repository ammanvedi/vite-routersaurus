import {isTsFile} from "../fileSystem/isTsFile";
import {isMdFile} from "../fileSystem/isMdFile";

export const isSupportedPageFile = (path: string) => {
    return isTsFile(path) || isMdFile(path)
}