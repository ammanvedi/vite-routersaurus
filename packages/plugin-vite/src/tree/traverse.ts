export const traverse = <N extends { children?: T | undefined } | object, T extends any[] = N[]>(
    root: N,
    parent: N | null,
    onNode: (n: T[number], parent: N | null) => void,
) => {
    onNode(root, parent);

    if ("children" in root && !!root.children) {
        root.children.forEach((c) => traverse(c, root, onNode));
    }
};
