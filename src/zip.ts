import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence whose elements are two element arrays created from the elements of the collections
 * passed as arguments. The length of the sequence is equal to the length of the shorter collection.
 * @param a A Collection to zip
 * @param b A Collection to zip
 */
function zip<T, U>(a: Collection<T>, b: Collection<U>) {
  const aIterable = asIterable(a)
  const bIterable = asIterable(b)

  return new Sequence(function* (): Iterator<[T, U]> {
    const aIterator = aIterable[Symbol.iterator]()
    const bIterator = bIterable[Symbol.iterator]()
    let aValue = aIterator.next()
    let bValue = bIterator.next()
    while(!aValue.done && !bValue.done) {
      yield [aValue.value, bValue.value]
      aValue = aIterator.next()
      bValue = bIterator.next()
    }
  })
}

export default zip
