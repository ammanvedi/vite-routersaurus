import ts from "typescript";

const { factory: f } = ts;

export const createObjectLiteralExpression = (properties: (ts.PropertyAssignment | ts.SpreadAssignment)[]) => {
    return f.createObjectLiteralExpression(properties);
};