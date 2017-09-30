import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Create a Sequence that contains the elements created from the input collection elements.
 * @param collection A collection to use as input.
 * @param fn A function that produces an element of the new Sequence using an element of the old collection.
 * @returns A Sequence that contains the transformed elements from the input collection.
 */
declare function map<T, U>(collection: Collection<T>, fn: (value: T, index: number) => U): Sequence<U>;
export default map;
