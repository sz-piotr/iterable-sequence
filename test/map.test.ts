import { map, XIterable } from '../src'

const mapObjects = [
  [1, 2, 3],
  {
    0: 1,
    1: 2,
    2: 3,
    length: 3
  },
  function* () {
    yield 1
    yield 2
    yield 3
  }
]
const mapFn = (value: number, index: number) => value + index

describe('map', () => {
  it('maps the values of the iterable using the function', () => {
    for(const iterable of mapObjects) {
      const value1 = map(iterable, mapFn)
        .collect()
      const value2 = new XIterable(iterable)
        .map(mapFn)
        .collect()

      expect(value1).toEqual([1, 3, 5])
      expect(value2).toEqual(value1)
    }
  })
})
