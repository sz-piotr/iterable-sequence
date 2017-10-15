import { Collection } from './utils';
import Sequence from './Sequence';
/**
 * Return a Sequence that contains the first elements of the collection. The argument specifies the
 * number of elements to take. If the length of the collection is smaller, all of the colleciton elements
 * will be present in the resulting sequence.
 * @param collection A collection to use as source of elements.
 * @param count The number of elements to take.
 */
declare function take<T>(collection: Collection<T>, count: number): Sequence<T>;
export default take;
