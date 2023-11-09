/**
 * Curried join
 */
export const join = (j: string) => (s: string[]) => {
    return s.join(j);
};