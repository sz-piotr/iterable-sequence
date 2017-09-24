import { Collection } from './utils';
declare class Sequence<T> implements Iterable<T> {
    [Symbol.iterator]: () => Iterator<T>;
    constructor(collection: Collection<T>);
    toArray(): T[];
    join(separator?: string): string;
    zip<U>(collection: Collection<U>): Sequence<[T, U]>;
    repeat(times?: number): Sequence<T>;
    map<U>(fn: (value: T, index: number) => U): Sequence<U>;
    flatMap<U>(fn: (value: T, index: number) => Collection<U>): Sequence<U>;
}
export default Sequence;
