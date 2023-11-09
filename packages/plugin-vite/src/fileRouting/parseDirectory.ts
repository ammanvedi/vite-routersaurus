import {lstatSync} from "fs";
import {ParsedDirectory} from "./types";
import {isIndexFile} from "./isIndexFile";
import {isLayoutFile} from "./isLayoutFile";
import {isLoaderFile} from "./isLoaderFile";
import {isNotFoundFile} from "./isNotFoundFile";
import {isTsFile} from "../fileSystem/isTsFile";
import {isSupportedPageFile} from "./isSupportedPageFile";

export const parseDirectory = (
    entries: string[],
): ParsedDirectory => {

    const result: ParsedDirectory = {
        indexFilePath : null,
        layoutFilePath: null,
        loaderFilePath: null,
        notFoundFilePath: null,
        childPagePaths: [],
        childDirectoryPaths: [],
    }

    return entries.reduce<ParsedDirectory>((parsed, entry) => {

        if (isIndexFile(entry)) {
            return {
                ...parsed,
                indexFilePath: entry
            }
        }

        if (isLayoutFile(entry)) {
            return {
                ...parsed,
                layoutFilePath: entry
            }
        }

        if (isLoaderFile(entry)) {
            return {
                ...parsed,
                loaderFilePath: entry
            }
        }

        if (isNotFoundFile(entry)) {
            return {
                ...parsed,
                notFoundFilePath: entry
            }
        }

        const stat = lstatSync(entry);

        if (stat.isDirectory()) {
            return {
                ...parsed,
                childDirectoryPaths: [
                    ...parsed.childDirectoryPaths,
                    entry
                ]
            }
        }

        if (stat.isFile() && isSupportedPageFile(entry)) {
            return {
                ...parsed,
                childPagePaths: [
                    ...parsed.childPagePaths,
                    entry
                ]
            }
        }

        return parsed

    }, result)

};