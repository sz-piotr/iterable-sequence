import { Sequence, isIterable } from './utils'
import collect from './collect'
import zip from './zip'
import repeat from './repeat'
import map from './map'

class XIterable<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  constructor(iterable: Sequence<T>) {
    if(typeof iterable === 'function') {
      this[Symbol.iterator] = iterable
    } else if(isIterable(iterable)) {
      this[Symbol.iterator] = () => iterable[Symbol.iterator]()
    } else {
      this[Symbol.iterator] = function* () {
        for(let i = 0; i < iterable.length; i++) {
          yield iterable[i]
        }
      }
    }
  }

  collect() {
    return collect(this)
  }

  zip<U>(iterable: Sequence<U>) {
    return zip(this, iterable)
  }

  repeat(times?: number) {
    return repeat(this, times)
  }

  map<U>(fn: (value: T, index: number) => U) {
    return map(this, fn)
  }
}

export default XIterable
