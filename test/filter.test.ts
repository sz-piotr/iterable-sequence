import { filter, Sequence } from '../src'

describe('filter', () => {
  it('accepts a Collection as argument', () => {
    expect(filter(
      [1, 2, 3],
      x => true
    )).toBeInstanceOf(Sequence)

    expect(filter(
      { 0: 1, length: 1 },
      x => true
    )).toBeInstanceOf(Sequence)

    expect(filter(
      function* () { yield 1 },
      x => true
    )).toBeInstanceOf(Sequence)
  })

  it('maps and flattens the values of the collection using the function provided', () => {
    const collection = [1, 2, 3, 0]
    const filterFn = (value: number, index: number) => value + index <= 3

    const value1 = filter(collection, filterFn)
      .toArray()
    const value2 = new Sequence(collection)
      .filter(filterFn)
      .toArray()

    expect(value1).toEqual([1, 2, 0])
    expect(value2).toEqual(value1)
  })
})
