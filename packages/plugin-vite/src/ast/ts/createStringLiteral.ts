import ts from "typescript";

const { factory: f } = ts;

export const createStringLiteral = (content: string) => {
    return f.createStringLiteral(content);
};