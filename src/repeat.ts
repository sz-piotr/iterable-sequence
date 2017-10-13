import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence whose elements are the elements of the passed collection repeated the specified number of times.
 * @param collection A Collection whose elements will be repeated in the resulting Sequence
 * @param times The number of times the elements are repeated. Defaults to Infinity
 */
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

/**
 * Return a Sequence consisting of the supplied value repeated the specified number of times.
 * @param value A value to repeat
 * @param times The number of times the value is repeated. Defaults to Infinity
 */
export function repeatValue<T>(value: T, times: number = Infinity) {
  return new Sequence(function* () {
    for(let i = 0; i < times; i++) {
      yield value
    }
  })
}

export default repeat
