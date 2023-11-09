import {MdxFileName} from "./types";

export const isMdFile = (fileName: string): fileName is MdxFileName<string> => {
    return fileName.endsWith("md") || fileName.endsWith("mdx");
};