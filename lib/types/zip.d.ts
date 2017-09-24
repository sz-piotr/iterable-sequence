import { Collection } from './utils';
import Sequence from './Sequence';
declare function zip<T, U>(a: Collection<T>, b: Collection<U>): Sequence<[T, U]>;
export default zip;
