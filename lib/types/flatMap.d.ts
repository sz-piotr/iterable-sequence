import { Collection } from './utils';
import Sequence from './Sequence';
declare function flatMap<T, U>(collection: Collection<T>, fn: (value: T, index: number) => Collection<U>): Sequence<U>;
export default flatMap;
