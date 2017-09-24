import { Collection } from './utils';
import Sequence from './Sequence';
declare function map<T, U>(collection: Collection<T>, fn: (value: T, index: number) => U): Sequence<U>;
export default map;
