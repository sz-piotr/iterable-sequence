import { map, Sequence } from '../src'

describe('map', () => {
  it('accepts a Collection as argument', () => {
    expect(map(
      [1, 2, 3],
      x => x
    )).toBeInstanceOf(Sequence)

    expect(map(
      { 0: 1, length: 1 },
      x => x
    )).toBeInstanceOf(Sequence)

    expect(map(
      function* () { yield 1 },
      x => x
    )).toBeInstanceOf(Sequence)
  })

  it('maps the values of the collection using the function provided', () => {
    const collection = [1, 2, 3]
    const mapFn = (value: number, index: number) => value + index

    const value1 = map(collection, mapFn)
      .toArray()
    const value2 = new Sequence(collection)
      .map(mapFn)
      .toArray()

    expect(value1).toEqual([1, 3, 5])
    expect(value2).toEqual(value1)
  })
})
