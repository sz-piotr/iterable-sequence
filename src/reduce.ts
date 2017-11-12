import { Collection, asIterable } from './utils'
import Sequence from './Sequence'

/**
 * Apply a function against an accumulator and each element of the Collection to reduce it to a single value.
 * @param collection A Collection whose elements will be reduces to a single value.
 * @param fn A function that uses an accumulator and an element and reduces them to a single value.
 */
function reduce<T>(collection: Collection<T>, fn: (accumulator: T, value: T, index: number) => T) {
  let accumulator
  let isFirstElement = true
  let index = 0
  for(const value of asIterable(collection)) {
    if(isFirstElement) {
      accumulator = value
      isFirstElement = false
    } else {
      accumulator = fn(<T>accumulator, value, index)
    }
    index++
  }
  return accumulator
}

export default reduce
