import { Collection } from './utils';
import Sequence from './Sequence';
declare function repeat<T>(collection: Collection<T>, times?: number): Sequence<T>;
export declare function repeatValue<T>(value: T, times?: number): Sequence<T>;
export default repeat;
