export const clone = <T>(o: Readonly<T>): T => {
    return JSON.parse(JSON.stringify(o))
}