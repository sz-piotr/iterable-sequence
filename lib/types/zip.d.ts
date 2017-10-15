import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence whose elements are two element arrays created from the elements of the collections
 * passed as arguments. The length of the sequence is equal to the length of the shorter collection.
 * @param a A Collection to zip
 * @param b A Collection to zip
 */
declare function zip<T, U>(a: Collection<T>, b: Collection<U>): Sequence<[T, U]>;
export default zip;
