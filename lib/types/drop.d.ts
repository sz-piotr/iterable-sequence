import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence that contains the elements of the collection without the first elements. The argument
 * specifies the number of elements to omit.
 * @param collection A collection to use as source of elements.
 * @param count The number of elements to omit.
 */
declare function drop<T>(collection: Collection<T>, count: number): Sequence<T>;
export default drop;
