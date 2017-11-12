import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence consisting of elements from the first collection followed by the elements from the second
 * Collection.
 * @param first A Collection to use when forming the resulting sequence.
 * @param second A Collection to use when forming the resulting sequence.
 */
declare function append<T, U>(first: Collection<T>, second: Collection<U>): Sequence<T | U>;
export default append;
