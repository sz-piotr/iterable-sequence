import XIterable from './XIterable'

export type Sequence<T> =
  Iterable<T> |
  ArrayLike<T> |
  (() => Iterator<T>)

export function isIterable<T>(arg: Sequence<T>): arg is Iterable<T> {
  return (<any>arg)[Symbol.iterator] !== undefined
}

export function asIterable<T>(arg: Sequence<T>): Iterable<T> {
  return isIterable(arg) ? arg : new XIterable(<any>arg)
}
