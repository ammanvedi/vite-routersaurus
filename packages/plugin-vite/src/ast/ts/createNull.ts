import ts from "typescript";

const { factory: f, NodeFlags } = ts;

export const createNull = () => {
    return f.createNull();
};