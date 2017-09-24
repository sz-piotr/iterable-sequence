import Sequence from './Sequence'

export type Collection<T> =
  Iterable<T> |
  ArrayLike<T> |
  (() => Iterator<T>)

export function isIterable<T>(collection: Collection<T>): collection is Iterable<T> {
  return (<any>collection)[Symbol.iterator] !== undefined
}

export function asIterable<T>(collection: Collection<T>): Iterable<T> {
  return isIterable(collection) ? collection : new Sequence(<any>collection)
}
