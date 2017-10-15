import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence that contains the elements from the input collection that occur after the first element that
 * satisfies the predicate including that element.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 */
function dropWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    let satisfied = false
    for(const value of iterable) {
      if(satisfied || !predicate(value, index++)) {
        satisfied = true
        yield value
      }
    }
  })
}

export default dropWhile
