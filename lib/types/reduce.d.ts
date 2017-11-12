import { Collection } from './utils';
/**
 * Apply a function against an accumulator and each element of the Collection to reduce it to a single value.
 * @param collection A Collection whose elements will be reduces to a single value.
 * @param fn A function that uses an accumulator and an element and reduces them to a single value.
 */
declare function reduce<T>(collection: Collection<T>, fn: (accumulator: T, value: T, index: number) => T): T | undefined;
export default reduce;
