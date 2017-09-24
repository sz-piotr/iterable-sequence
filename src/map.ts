import { Sequence, asIterable } from './utils'
import XIterable from './XIterable'

function map<T, U>(iterable: Sequence<T>, fn: (value: T, index: number) => U) {
  iterable = asIterable(iterable)
  return new XIterable(function* () {
    let index = 0
    for(const value of iterable) {
      yield fn(value, index++)
    }
  })
}

export default map
