import {pipe} from "fp-ts/function";
import * as A from 'fp-ts/Array'
import {isNonEmptyString} from "../string/isNonEmptyString";
import {snakeCaseToUpperCaseCamelCase} from "../string/snakeCaseToUpperCaseCamelCase";
import {join} from "../string/join";
import {removeSymbols} from "../string/removeSymbols";

export const generateSuspenseModuleName = (sitePath: string) => {
    return pipe(generateModuleName(sitePath), (s) => `${s}WithSuspense`);
};

export const generateModuleName = (sitePath: string) => {
    return pipe(
        sitePath.split("/"),
        A.filter(isNonEmptyString),
        A.map(snakeCaseToUpperCaseCamelCase),
        A.map(removeSymbols),
        join(""),
        (s) => s || "Root",
        (s) => `Lazy${s}`,
    );
};