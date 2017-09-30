import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Create a Sequence that contains the elements from the input collection that occur before the element that no
 * longer satisfies the predicate.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 * @returns A Sequence that contains the elements from the input collection that occur before the element that
 * no longer satisfies the predicate.
 */
function takeWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      if(predicate(value, index++)) {
        yield value
      } else {
        break
      }
    }
  })
}

export default takeWhile
