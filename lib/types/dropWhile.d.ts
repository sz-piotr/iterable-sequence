import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence that contains the elements from the input collection that occur after the first element that
 * satisfies the predicate including that element.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 */
declare function dropWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean): Sequence<T>;
export default dropWhile;
