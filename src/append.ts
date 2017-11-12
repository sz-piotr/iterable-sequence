import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Return a Sequence consisting of elements from the first collection followed by the elements from the second
 * Collection.
 * @param first A Collection to use when forming the resulting sequence.
 * @param second A Collection to use when forming the resulting sequence.
 */
function append<T, U>(first: Collection<T>, second: Collection<U>) {
  const firstIterable = asIterable(first)
  const secondIterable = asIterable(second)

  return new Sequence(function* (): Iterator<T | U> {
    for(const value of firstIterable) {
      yield value
    }
    for(const value of secondIterable) {
      yield value
    }
  })
}

export default append
