import { CanBeIterable, asIterable } from './utils'
import XIterable from './XIterable'

function collect<T>(object: CanBeIterable<T>) {
  const result = []
  const iterable = asIterable(object)
  for(const value of iterable) {
    result.push(value)
  }
  return result
}

export default collect
