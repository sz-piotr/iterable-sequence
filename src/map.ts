import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence that contains the elements created from the input collection elements.
 * @param collection A collection to use as input.
 * @param fn A function that produces an element of the new Sequence using an element of the old collection.
 */
function map<T, U>(collection: Collection<T>, fn: (value: T, index: number) => U) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      yield fn(value, index++)
    }
  })
}

export default map
