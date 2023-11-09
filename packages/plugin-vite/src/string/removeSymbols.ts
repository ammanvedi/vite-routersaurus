export const removeSymbols = (path: string) => {
    return path.replace(/[^\w]/g, "");
};