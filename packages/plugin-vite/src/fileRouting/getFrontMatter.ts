import {readFileSync} from "node:fs";
import matter from 'gray-matter';
import {isMdFile} from "../fileSystem/isMdFile";

const frontMatterRegex = /---(.|\n|\r)+---/i

export const getFrontMatter = (filePath: string): Record<string, string> => {
    const fileContent = readFileSync(filePath).toString()
    const result = isMdFile(filePath) ? [fileContent] : frontMatterRegex.exec(fileContent);
    if(!result || !result['0']) {
        return {}
    }
    const m = matter(result['0']);
    return m.data as Record<string, string>; // todo check type properly
};

