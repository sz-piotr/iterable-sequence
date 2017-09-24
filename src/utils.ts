import XIterable from './XIterable'

export type CanBeIterable<T> =
  Iterable<T> |
  ArrayLike<T> |
  (() => Iterator<T>)

export function isIterable<T>(arg: CanBeIterable<T>): arg is Iterable<T> {
  return (<any>arg)[Symbol.iterator] !== undefined
}

export function asIterable<T>(arg: CanBeIterable<T>): Iterable<T> {
  return isIterable(arg) ? arg : new XIterable(<any>arg)
}
