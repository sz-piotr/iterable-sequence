export declare type Collection<T> = Iterable<T> | ArrayLike<T> | (() => Iterator<T>);
export declare function isIterable<T>(collection: Collection<T>): collection is Iterable<T>;
export declare function asIterable<T>(collection: Collection<T>): Iterable<T>;
