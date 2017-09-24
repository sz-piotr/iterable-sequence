import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

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
