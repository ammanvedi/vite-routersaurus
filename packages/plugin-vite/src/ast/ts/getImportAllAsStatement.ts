import ts from "typescript";
import {createStringLiteral} from "./createStringLiteral";
import {createIdentifier} from "./createIdentifier";

const { factory: f } = ts;

export const getImportAllAsDeclaration = (alias: string, module: string) => {
    const importedName = f.createNamespaceImport(createIdentifier(alias));
    const importClause = f.createImportClause(false, undefined, importedName);

    return f.createImportDeclaration(
        [],
        importClause,
        createStringLiteral(module),
    );
};