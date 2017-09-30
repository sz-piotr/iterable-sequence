import { takeWhile, Sequence } from '../src'

describe('takeWhile', () => {
  it('accepts a Collection as argument', () => {
    expect(takeWhile(
      [1, 2, 3],
      x => true
    )).toBeInstanceOf(Sequence)

    expect(takeWhile(
      { 0: 1, length: 1 },
      x => true
    )).toBeInstanceOf(Sequence)

    expect(takeWhile(
      function* () { yield 1 },
      x => true
    )).toBeInstanceOf(Sequence)
  })

  it('maps and flattens the values of the collection using the function provided', () => {
    const collection = [1, 2, 3, 0]
    const takeWhileFn = (value: number, index: number) => value + index <= 3

    const value1 = takeWhile(collection, takeWhileFn)
      .toArray()
    const value2 = new Sequence(collection)
      .takeWhile(takeWhileFn)
      .toArray()

    expect(value1).toEqual([1, 2])
    expect(value2).toEqual(value1)
  })
})
