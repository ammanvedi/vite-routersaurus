import ts from "typescript";

const { factory: f } = ts;

export const createFunctionCallExpression =
    (callee: ts.Expression) => (args: ts.Expression[]) => {
        return f.createCallExpression(callee, undefined, args);
    };