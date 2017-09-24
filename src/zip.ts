import { CanBeIterable, asIterable } from './utils'
import XIterable from './XIterable'

function zip<T, U>(a: CanBeIterable<T>, b: CanBeIterable<U>) {
  const aIterable = asIterable(a)
  const bIterable = asIterable(b)

  return new XIterable(function* () {
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
