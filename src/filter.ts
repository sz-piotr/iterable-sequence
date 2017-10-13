import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence that contains the elements from the input collection that satisfy the predicate.
 * @param collection A collection to filter.
 * @param predicate A function that tests if a value satisfies some condition.
 */
function filter<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean) {

  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      if(predicate(value, index++)) {
        yield value
      }
    }
  })
}

export default filter
