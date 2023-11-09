import ts from "typescript";

const { factory: f, NodeFlags } = ts;

export const createArrowFunctionStatement = (body: ts.ConciseBody) => {
    return f.createArrowFunction(
        [],
        [],
        [],
        undefined,
        f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        body,
    );
};