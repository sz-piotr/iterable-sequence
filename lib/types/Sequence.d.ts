import { Collection } from './utils';
declare class Sequence<T> implements Iterable<T> {
    [Symbol.iterator]: () => Iterator<T>;
    constructor(collection: Collection<T>);
    toArray(): T[];
    join(separator?: string): string;
    zip<U>(collection: Collection<U>): Sequence<[T, U]>;
    repeat(times?: number): Sequence<T>;
    /**
     * Create a new Sequence that contains the elements created from the elements of this Sequence.
     * @param fn A function that produces an element of the new Sequence using an element of the old collection.
     * @returns A new Sequence that contains the elements created from the elements of this Sequence.
     */
    map<U>(fn: (value: T, index: number) => U): Sequence<U>;
    /**
     * Create a new Sequence that contains the elements of flattened collections created from the elements
     * of this Sequence.
     * @param fn A function that produces an element of the new Sequence using an element of the old collection.
     * @returns A new Sequence that contains the elements of flattened collections created from the elements
     * of this Sequence.
     */
    flatMap<U>(fn: (value: T, index: number) => Collection<U>): Sequence<U>;
    /**
     * Create a new Sequence that contains the elements from this Sequence that satisfy the predicate.
     * @param predicate A function that tests if a value satisfies some condition.
     * @returns A new Sequence that contains the elements from this Sequence that satisfy the predicate.
     */
    filter(predicate: (value: T, index: number) => boolean): Sequence<T>;
    /**
     * Create a new Sequence that contains the elements from this Sequence that occur before the element that no
     * longer satisfies the predicate.
     * @param collection A collection to filter.
     * @param predicate A function that tests if a value satisfies some condition.
     * @returns A new Sequence that contains the elements from this Sequence that occur before the element that no
     * longer satisfies the predicate.
     */
    takeWhile(predicate: (value: T, index: number) => boolean): Sequence<T>;
}
export default Sequence;
