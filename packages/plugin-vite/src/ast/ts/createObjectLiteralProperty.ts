import ts from "typescript";
import {createStringLiteral} from "./createStringLiteral";

const { factory: f } = ts;

export const createObjectLiteralProperty =
    (name: string) => (initializer: ts.Expression) => {
        return f.createPropertyAssignment(createStringLiteral(name), initializer);
    };