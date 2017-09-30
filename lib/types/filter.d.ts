import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Create a Sequence that contains the elements from the input collection that satisfy the predicate.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 * @returns A Sequence that contains the elements from the input collection that satisfy the predicate.
 */
declare function filter<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean): Sequence<T>;
export default filter;
