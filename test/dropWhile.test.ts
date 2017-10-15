import { dropWhile, Sequence } from '../src'

describe('dropWhile', () => {
  it('accepts a Collection as argument', () => {
    expect(dropWhile(
      [1, 2, 3],
      x => true
    )).toBeInstanceOf(Sequence)

    expect(dropWhile(
      { 0: 1, length: 1 },
      x => true
    )).toBeInstanceOf(Sequence)

    expect(dropWhile(
      function* () { yield 1 },
      x => true
    )).toBeInstanceOf(Sequence)
  })

  it('maps and flattens the values of the collection using the function provided', () => {
    const collection = [1, 2, 3, 0]
    const dropWhileFn = (value: number, index: number) => value + index <= 3

    const value1 = dropWhile(collection, dropWhileFn)
      .toArray()
    const value2 = new Sequence(collection)
      .dropWhile(dropWhileFn)
      .toArray()

    expect(value1).toEqual([3, 0])
    expect(value2).toEqual(value1)
  })
})
