import { CanBeIterable, isIterable } from './utils'
import collect from './collect'

class XIterable<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  constructor(object: CanBeIterable<T>) {
    if(typeof object === 'function') {
      this[Symbol.iterator] = object
    } else if(isIterable(object)) {
      this[Symbol.iterator] = () => object[Symbol.iterator]()
    } else {
      this[Symbol.iterator] = function* () {
        for(let i = 0; i < object.length; i++) {
          yield object[i]
        }
      }
    }
  }

  collect() {
    return collect(this)
  }
}

export default XIterable
