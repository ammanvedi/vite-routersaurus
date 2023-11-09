import ts from "typescript";
import {createIdentifier} from "./createIdentifier";
import {createStringLiteral} from "./createStringLiteral";

const { factory: f, NodeFlags } = ts;


export const createDefaultImportStatement = (
    nameSpace: string,
    importPath: string,
) => {
    const importClause = f.createImportClause(
        false,
        createIdentifier(nameSpace),
        undefined,
    );

    return f.createImportDeclaration(
        [],
        importClause,
        createStringLiteral(importPath),
    );
};