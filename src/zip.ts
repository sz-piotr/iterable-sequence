import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

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
