import ts from "typescript";

export const astFromCodeString = (code: string) => {
    return ts.createSourceFile('myFile.ts', code, 99)
}