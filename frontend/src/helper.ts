export function UniqueConcat<T>(array1: T[], array2: T[]): T[] {
    const result: T[] = array1.slice();
    array2.forEach((element) => {
        if (!result.includes(element)) {
            result.push(element);
        }
    });
    return result;
}