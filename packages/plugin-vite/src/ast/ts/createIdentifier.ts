import ts from "typescript";

const { factory: f, NodeFlags } = ts;

export const createIdentifier = (content: string) => {
    return f.createIdentifier(content);
};