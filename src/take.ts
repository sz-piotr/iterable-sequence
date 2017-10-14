import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence that contains the first elements of the collection. The argument specifies the
 * number of elements to take. If the length of the collection is smaller, all of the colleciton elements
 * will be present in the resulting sequence.
 * @param collection A collection to use as source of elements.
 * @param count The number of elements to take.
 */
function take<T>(collection: Collection<T>, count: number) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      if(index++ < count) {
        yield value
      } else {
        break
      }
    }
  })
}

export default take
