import { Sequence, asIterable } from './utils'
import XIterable from './XIterable'

function collect<T>(sequence: Sequence<T>) {
  const iterable = asIterable(sequence)
  const result = []
  for(const value of iterable) {
    result.push(value)
  }
  return result
}

export default collect
