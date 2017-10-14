import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence that contains the elements of the collection without the first elements. The argument
 * specifies the number of elements to omit.
 * @param collection A collection to use as source of elements.
 * @param count The number of elements to omit.
 */
function drop<T>(collection: Collection<T>, count: number) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      if(index++ >= count) {
        yield value
      }
    }
  })
}

export default drop
