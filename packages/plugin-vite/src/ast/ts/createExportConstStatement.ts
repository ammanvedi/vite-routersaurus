import ts from "typescript";

const { factory: f, NodeFlags } = ts;

export const createExportConstStatement =
    (name: string) => (initializer: ts.Expression) => {
        return f.createVariableStatement(
            [f.createToken(ts.SyntaxKind.ExportKeyword)],
            f.createVariableDeclarationList(
                [f.createVariableDeclaration(name, undefined, undefined, initializer)],
                NodeFlags.Const,
            ),
        );
    };