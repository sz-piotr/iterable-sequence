import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Create a Sequence that contains the elements of flattened collections created from the input collection elements.
 * @param collection A collection to use as input.
 * @param fn A function that produces an element of the new Sequence using an element of the old collection.
 * @returns A Sequence that contains the elements of flattened collections created from the input collection elements.
 */
function flatMap<T, U>(collection: Collection<T>, fn: (value: T, index: number) => Collection<U>) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      const result = asIterable(fn(value, index++))
      for(const innerValue of result) {
        yield innerValue
      }
    }
  })
}

export default flatMap
