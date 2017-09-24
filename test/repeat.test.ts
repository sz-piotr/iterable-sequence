import { repeat, repeatValue, Sequence } from '../src'

describe('repeat', () => {
  it('accepts a Collection as argument', () => {
    expect(repeat([1, 2, 3])).toBeInstanceOf(Sequence)
    expect(repeat({ 0: 1, length: 1 })).toBeInstanceOf(Sequence)
    expect(repeat(function* () { yield 1 })).toBeInstanceOf(Sequence)
  })

  it('creates an Sequence with the Collection repeated', () => {
    const value1 = repeat('abc', 2)
      .toArray()
    const value2 = new Sequence('abc')
      .repeat(2)
      .toArray()

    expect(value1).toEqual(['a', 'b', 'c', 'a', 'b', 'c'])
    expect(value2).toEqual(value1)
  })

  it('will work with a single argument', () => {
    const value1 = repeat([1])
    const value2 = new Sequence([1]).repeat()

    expect(value1).toBeInstanceOf(Sequence)
    expect(value2).toBeInstanceOf(Sequence)
  })
})

describe('repeatValue', () => {
  it('creates an Sequence with the value repeated', () => {
    const value = repeatValue(1, 5).toArray()
    expect(value).toEqual([1, 1, 1, 1, 1])
  })

  it('will work with a single argument', () => {
    const value = repeatValue(1)
    expect(value).toBeInstanceOf(Sequence)
  })
})
