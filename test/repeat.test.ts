import { repeat, repeatValue, XIterable } from '../src'

describe('repeat', () => {
  it('accepts a sequence as argument', () => {
    expect(repeat([1, 2, 3])).toBeInstanceOf(XIterable)
    expect(repeat({ 0: 1, length: 1 })).toBeInstanceOf(XIterable)
    expect(repeat(function* () { yield 1 })).toBeInstanceOf(XIterable)
  })

  it('creates an XIterable with the sequence repeated', () => {
    const value1 = repeat('abc', 2)
      .collect()
    const value2 = new XIterable('abc')
      .repeat(2)
      .collect()

    expect(value1).toEqual(['a', 'b', 'c', 'a', 'b', 'c'])
    expect(value2).toEqual(value1)
  })

  it('will work with a single argument', () => {
    const value1 = repeat([1])
    const value2 = new XIterable([1]).repeat()

    expect(value1).toBeInstanceOf(XIterable)
    expect(value2).toBeInstanceOf(XIterable)
  })
})

describe('repeatValue', () => {
  it('creates an XIterable with the value repeated', () => {
    const value = repeatValue(1, 5).collect()
    expect(value).toEqual([1, 1, 1, 1, 1])
  })

  it('will work with a single argument', () => {
    const value = repeatValue(1)
    expect(value).toBeInstanceOf(XIterable)
  })
})
