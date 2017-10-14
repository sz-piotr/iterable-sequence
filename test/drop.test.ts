import { drop, Sequence } from '../src'

describe('drop', () => {
  it('accepts a Collection as argument', () => {
    expect(drop([1, 2, 3], 1)).toBeInstanceOf(Sequence)
    expect(drop({ 0: 1, length: 1 }, 1)).toBeInstanceOf(Sequence)
    expect(drop(function* () { yield 1 }, 1)).toBeInstanceOf(Sequence)
  })

  it('drops the first elements of the collection', () => {
    const collection = [1, 2, 3, 4]
    const value1 = drop(collection, 2)
      .toArray()
    const value2 = new Sequence(collection)
      .drop(2)
      .toArray()

    const value3 = drop(collection, 6)
      .toArray()
    const value4 = new Sequence(collection)
      .drop(6)
      .toArray()

    expect(value1).toEqual([3, 4])
    expect(value2).toEqual(value1)

    expect(value3).toEqual([])
    expect(value4).toEqual(value3)
  })
})
