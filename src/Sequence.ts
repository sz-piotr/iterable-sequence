import { Collection, isIterable } from './utils'
import zip from './zip'
import repeat from './repeat'
import map from './map'
import flatMap from './flatMap'
import filter from './filter'
import takeWhile from './takeWhile'

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

  /**
   * Create a new Sequence that contains the elements created from the elements of this Sequence.
   * @param fn A function that produces an element of the new Sequence using an element of the old collection.
   * @returns A new Sequence that contains the elements created from the elements of this Sequence.
   */
  map<U>(fn: (value: T, index: number) => U) {
    return map(this, fn)
  }


  /**
   * Create a new Sequence that contains the elements of flattened collections created from the elements
   * of this Sequence.
   * @param fn A function that produces an element of the new Sequence using an element of the old collection.
   * @returns A new Sequence that contains the elements of flattened collections created from the elements
   * of this Sequence.
   */
  flatMap<U>(fn: (value: T, index: number) => Collection<U>) {
    return flatMap(this, fn)
  }

  /**
   * Create a new Sequence that contains the elements from this Sequence that satisfy the predicate.
   * @param predicate A function that tests if a value satisfies some condition.
   * @returns A new Sequence that contains the elements from this Sequence that satisfy the predicate.
   */
  filter(predicate: (value: T, index: number) => boolean) {
    return filter(this, predicate)
  }

  /**
   * Create a new Sequence that contains the elements from this Sequence that occur before the element that no
   * longer satisfies the predicate.
   * @param collection A collection to filter.
   * @param predicate A function that tests if a value satisfies some condition.
   * @returns A new Sequence that contains the elements from this Sequence that occur before the element that no
   * longer satisfies the predicate.
   */
  takeWhile(predicate: (value: T, index: number) => boolean) {
    return takeWhile(this, predicate)
  }
}

export default Sequence
