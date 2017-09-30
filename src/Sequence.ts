import { Collection, isIterable } from './utils'
import zip from './zip'
import repeat from './repeat'
import map from './map'
import flatMap from './flatMap'
import filter from './filter'

class Sequence<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  constructor(collection: Collection<T>) {
    if(typeof collection === 'function') {
      this[Symbol.iterator] = collection
    } else if(isIterable(collection)) {
      this[Symbol.iterator] = () => collection[Symbol.iterator]()
    } else {
      this[Symbol.iterator] = function* () {
        for(let i = 0; i < collection.length; i++) {
          yield collection[i]
        }
      }
    }
  }

  toArray() {
    const result = []
    for(const value of this) {
      result.push(value)
    }
    return result
  }

  join(separator = '') {
    let result = ''
    let first = true
    for(const value of this) {
      if(first) {
        result += value
        first = false
      } else {
        result += separator + value
      }
    }
    return result
  }

  zip<U>(collection: Collection<U>) {
    return zip(this, collection)
  }

  repeat(times?: number) {
    return repeat(this, times)
  }

  map<U>(fn: (value: T, index: number) => U) {
    return map(this, fn)
  }

  flatMap<U>(fn: (value: T, index: number) => Collection<U>) {
    return flatMap(this, fn)
  }

  filter(fn: (value: T, index: number) => boolean) {
    return filter(this, fn)
  }
}

export default Sequence
