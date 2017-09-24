import { Sequence, asIterable } from './utils'
import XIterable from './XIterable'

function repeat<T>(iterable: Sequence<T>, times: number = Infinity) {
  iterable = asIterable(iterable)
  return new XIterable(function* () {
    for(let i = 0; i < times; i++) {
      for(const value of iterable) {
        yield value
      }
    }
  })
}

export function repeatValue<T>(value: T, times: number = Infinity) {
  return new XIterable(function* () {
    for(let i = 0; i < times; i++) {
      yield value
    }
  })
}

export default repeat
