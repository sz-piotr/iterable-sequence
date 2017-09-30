import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

function takeWhile<T>(collection: Collection<T>, fn: (value: T, index: number) => boolean) {
  const iterable = asIterable(collection)
  return new Sequence(function* () {
    let index = 0
    for(const value of iterable) {
      if(fn(value, index++)) {
        yield value
      } else {
        break
      }
    }
  })
}

export default takeWhile
