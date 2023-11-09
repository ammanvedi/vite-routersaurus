import ts from "typescript";
import {Statements} from "../ast/ts/types";

const { factory: f, NodeFlags } = ts;

export const getSourceString = (s: Statements) => {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const file = f.createSourceFile(
        s,
        f.createToken(ts.SyntaxKind.EndOfFileToken),
        NodeFlags.JavaScriptFile,
    );

    return printer.printFile(file);
};