import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

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
