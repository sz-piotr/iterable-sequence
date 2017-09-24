import { Sequence, asIterable } from './utils'
import XIterable from './XIterable'

function collect<T>(iterable: Sequence<T>) {
  iterable = asIterable(iterable)
  const result = []
  for(const value of iterable) {
    result.push(value)
  }
  return result
}

export default collect
