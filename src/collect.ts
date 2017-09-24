import { CanBeIterable, asIterable } from './utils'
import XIterable from './XIterable'

function collect<T>(iterable: CanBeIterable<T>) {
  iterable = asIterable(iterable)
  const result = []
  for(const value of iterable) {
    result.push(value)
  }
  return result
}

export default collect
