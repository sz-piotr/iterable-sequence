import { Sequence, isIterable } from './utils'
import collect from './collect'
import zip from './zip'
import repeat from './repeat'
import map from './map'

class XIterable<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  constructor(sequence: Sequence<T>) {
    if(typeof sequence === 'function') {
      this[Symbol.iterator] = sequence
    } else if(isIterable(sequence)) {
      this[Symbol.iterator] = () => sequence[Symbol.iterator]()
    } else {
      this[Symbol.iterator] = function* () {
        for(let i = 0; i < sequence.length; i++) {
          yield sequence[i]
        }
      }
    }
  }

  collect() {
    return collect(this)
  }

  zip<U>(sequence: Sequence<U>) {
    return zip(this, sequence)
  }

  repeat(times?: number) {
    return repeat(this, times)
  }

  map<U>(fn: (value: T, index: number) => U) {
    return map(this, fn)
  }
}

export default XIterable
