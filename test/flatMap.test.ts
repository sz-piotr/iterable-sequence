import { flatMap, Sequence } from '../src'

describe('flatMap', () => {
  it('accepts a Collection as argument', () => {
    expect(flatMap(
      [1, 2, 3],
      x => [x]
    )).toBeInstanceOf(Sequence)

    expect(flatMap(
      { 0: 1, length: 1 },
      x => [x]
    )).toBeInstanceOf(Sequence)

    expect(flatMap(
      function* () { yield 1 },
      x => [x]
    )).toBeInstanceOf(Sequence)
  })

  it('maps and flattens the values of the collection using the function provided', () => {
    const collection = [1, 2, 3]
    const mapFn = (value: number, index: number) => [value, index]

    const value1 = flatMap(collection, mapFn)
      .toArray()
    const value2 = new Sequence(collection)
      .flatMap(mapFn)
      .toArray()

    expect(value1).toEqual([1, 0, 2, 1, 3, 2])
    expect(value2).toEqual(value1)
  })
})
