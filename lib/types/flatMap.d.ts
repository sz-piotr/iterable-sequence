import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence that contains the elements of flattened collections created from the input collection elements.
 * @param collection A collection to use as input.
 * @param fn A function that produces an element of the new Sequence using an element of the old collection.
 */
declare function flatMap<T, U>(collection: Collection<T>, fn: (value: T, index: number) => Collection<U>): Sequence<U>;
export default flatMap;
