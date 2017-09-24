import { map, XIterable } from '../src'

describe('map', () => {
  it('accepts a sequence as argument', () => {
    expect(map(
      [1, 2, 3],
      x => x
    )).toBeInstanceOf(XIterable)

    expect(map(
      { 0: 1, length: 1 },
      x => x
    )).toBeInstanceOf(XIterable)

    expect(map(
      function* () { yield 1 },
      x => x
    )).toBeInstanceOf(XIterable)
  })

  it('maps the values of the iterable using the function provided', () => {
    const iterable = [1, 2, 3]
    const mapFn = (value: number, index: number) => value + index

    const value1 = map(iterable, mapFn)
      .collect()
    const value2 = new XIterable(iterable)
      .map(mapFn)
      .collect()

    expect(value1).toEqual([1, 3, 5])
    expect(value2).toEqual(value1)
  })
})
