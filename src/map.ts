import { Sequence, asIterable } from './utils'
import XIterable from './XIterable'

function map<T, U>(sequence: Sequence<T>, fn: (value: T, index: number) => U) {
  const iterable = asIterable(sequence)
  return new XIterable(function* () {
    let index = 0
    for(const value of iterable) {
      yield fn(value, index++)
    }
  })
}

export default map
