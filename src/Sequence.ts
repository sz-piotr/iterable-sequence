import { Collection, isIterable } from './utils'
import repeat from './repeat'
import zip from './zip'
import append from './append'
import map from './map'
import flatMap from './flatMap'
import filter from './filter'
import take from './take'
import takeWhile from './takeWhile'
import drop from './drop'
import dropWhile from './dropWhile'
import reduce from './reduce'

class Sequence<T> implements Iterable<T> {
  [Symbol.iterator]: () => Iterator<T>

  /**
   * Creates a new Sequence
   * @param collection A collection to form the sequence from
   */
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

  /**
   * Return an array with the elements of this Sequence
   */
  toArray() {
    const result: T[] = []
    for(const value of this) {
      result.push(value)
    }
    return result
  }

  /**
   * Return a string formed by concatenating the string representation of the elements of this Sequence
   * @param separator A string that will be used between the Sequence elements. Defaults to empty string
   */
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

  /**
   * For each element of this Sequence call the supplied function with the value and index of this element.
   * @param fn The function to call with the values and indices of the elements of this Sequence.
   */
  forEach(fn: (value: T, index: number) => any) {
    let index = 0
    for(const value of this) {
      fn(value, index++)
    }
  }

  /**
   * Return a Sequence whose elements are the elements of this Sequence repeated the specified number of times.
   * @param times The number of times the elements are repeated. Defaults to Infinity
   */
  repeat(times?: number) {
    return repeat(this, times)
  }

  /**
   * Return a Sequence whose elements are two element arrays created from the elements of this Sequence and
   * the collection passed as arguments. The length of the sequence is equal to the length of the shorter collection.
   * @param collection A Collection to zip
   */
  zip<U>(collection: Collection<U>) {
    return zip(this, collection)
  }

  /**
   * Return a Sequence consisting of elements from this Sequence followed by the elements from the Collection.
   * @param collection A Collection to use when forming the resulting sequence.
   */
  append<U>(collection: Collection<U>) {
    return append(this, collection)
  }

  /**
   * Return a new Sequence that contains the elements created from the elements of this Sequence.
   * @param fn A function that produces an element of the new Sequence using an element of the old collection.
   */
  map<U>(fn: (value: T, index: number) => U) {
    return map(this, fn)
  }

  /**
   * Return a new Sequence that contains the elements of flattened collections created from the elements
   * of this Sequence.
   * @param fn A function that produces an element of the new Sequence using an element of the old collection.
   */
  flatMap<U>(fn: (value: T, index: number) => Collection<U>) {
    return flatMap(this, fn)
  }

  /**
   * Return a new Sequence that contains the elements from this Sequence that satisfy the predicate.
   * @param predicate A function that tests if a value satisfies some condition.
   */
  filter(predicate: (value: T, index: number) => boolean) {
    return filter(this, predicate)
  }

  /**
   * Return a Sequence that contains the first elements of this sequence. The argument specifies the
   * number of elements to take. If the length of this sequence is smaller, all of the sequence elements
   * will be present in the resulting sequence.
   * @param count The number of elements to take.
   */
  take(count: number) {
    return take(this, count)
  }

  /**
   * Return a new Sequence that contains the elements from this Sequence that occur before the element that no
   * longer satisfies the predicate.
   * @param predicate A function that tests if a value satisfies some condition.
   */
  takeWhile(predicate: (value: T, index: number) => boolean) {
    return takeWhile(this, predicate)
  }

  /**
   * Return a Sequence that contains the elements of this sequence without the first elements. The argument
   * specifies the number of elements to omit.
   * @param count The number of elements to omit.
  */
  drop(count: number) {
    return drop(this, count)
  }

  /**
   * Return a Sequence that contains the elements from this Sequence that occur after the first element that
   * satisfies the predicate including that element.
   * @param predicate A function that tests if a value satisfies some condition.
   */
  dropWhile(predicate: (value: T, index: number) => boolean) {
    return dropWhile(this, predicate)
  }
  /**
   * Apply a function against an accumulator and each element of this Sequence to reduce it to a single value.
   * @param fn A function that uses an accumulator and an element and reduces them to a single value.
   */
  reduce(fn: (accumulator: T, value: T, index: number) => T) {
    return reduce(this, fn)
  }
}

export default Sequence
