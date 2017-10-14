import { take, Sequence } from '../src'

describe('take', () => {
  it('accepts a Collection as argument', () => {
    expect(take([1, 2, 3], 1)).toBeInstanceOf(Sequence)
    expect(take({ 0: 1, length: 1 }, 1)).toBeInstanceOf(Sequence)
    expect(take(function* () { yield 1 }, 1)).toBeInstanceOf(Sequence)
  })

  it('takes the first elements of the collection', () => {
    const collection = [1, 2, 3, 4]
    const value1 = take(collection, 2)
      .toArray()
    const value2 = new Sequence(collection)
      .take(2)
      .toArray()

    const value3 = take(collection, 6)
      .toArray()
    const value4 = new Sequence(collection)
      .take(6)
      .toArray()

    expect(value1).toEqual([1, 2])
    expect(value2).toEqual(value1)

    expect(value3).toEqual([1, 2, 3, 4])
    expect(value4).toEqual(value3)
  })
})
