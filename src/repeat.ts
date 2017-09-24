import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

function repeat<T>(collection: Collection<T>, times: number = Infinity) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    for(let i = 0; i < times; i++) {
      for(const value of iterable) {
        yield value
      }
    }
  })
}

export function repeatValue<T>(value: T, times: number = Infinity) {
  return new Sequence(function* () {
    for(let i = 0; i < times; i++) {
      yield value
    }
  })
}

export default repeat
