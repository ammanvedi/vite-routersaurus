export const ensureStartsWith = (startsWith: string) => (s: string) => {
    return s.startsWith(startsWith) ? s : `${startsWith}${s}`;
};
