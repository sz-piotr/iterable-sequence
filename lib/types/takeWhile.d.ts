import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence that contains the elements from the input collection that occur before the element that no
 * longer satisfies the predicate.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 */
declare function takeWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean): Sequence<T>;
export default takeWhile;
