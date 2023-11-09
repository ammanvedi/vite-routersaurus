import ts from "typescript";

const { factory: f } = ts;

export const createPropertyAccessExpression = (object: string, property: string) => {
    return f.createPropertyAccessExpression(
        f.createIdentifier(object),
        f.createIdentifier(property),
    );
};