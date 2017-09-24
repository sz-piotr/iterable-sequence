import XIterable from './XIterable'

export type Sequence<T> =
  Iterable<T> |
  ArrayLike<T> |
  (() => Iterator<T>)

export function isIterable<T>(sequence: Sequence<T>): sequence is Iterable<T> {
  return (<any>sequence)[Symbol.iterator] !== undefined
}

export function asIterable<T>(sequence: Sequence<T>): Iterable<T> {
  return isIterable(sequence) ? sequence : new XIterable(<any>sequence)
}
