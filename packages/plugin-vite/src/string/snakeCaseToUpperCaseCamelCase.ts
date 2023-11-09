import {pipe} from "fp-ts/function";
import * as A from 'fp-ts/Array'
import {capitalize} from "./capitalize";
import {join} from "./join";
export const snakeCaseToUpperCaseCamelCase = (s: string) => {
    return pipe(s.split("-"), A.map(capitalize),  join(""));
};