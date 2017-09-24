import { CanBeIterable, isIterable } from './utils'
import collect from './collect'
import zip from './zip'
import repeat from './repeat'

class XIterable<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  constructor(iterable: CanBeIterable<T>) {
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

  zip<U>(iterable: CanBeIterable<U>) {
    return zip(this, iterable)
  }

  repeat(times?: number) {
    return repeat(this, times)
  }
}

export default XIterable
