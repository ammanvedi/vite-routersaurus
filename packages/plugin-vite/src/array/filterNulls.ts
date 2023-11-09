const isNotNullOrUndefined = <A>(arg: A | null | undefined): arg is A => {
    return arg != null
}

export const filterNulls = <A>(arr: Array<A | null | undefined>): Array<A> => {
    return arr.filter(isNotNullOrUndefined);
};