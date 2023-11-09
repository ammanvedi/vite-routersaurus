import ts from "typescript";

const { factory: f, NodeFlags } = ts;

export const createConstStatement = (name: string) => (initializer: ts.Expression) => {
    return f.createVariableStatement(
        undefined,
        f.createVariableDeclarationList(
            [f.createVariableDeclaration(name, undefined, undefined, initializer)],
            NodeFlags.Const,
        ),
    );
};