import repeat, { repeatValue } from './repeat'
import XIterable from './XIterable'

describe('repeat', () => {
  it('works with iterables', () => {
    const value1 = repeat('abc', 2)
      .collect()
    const value2 = new XIterable('abc')
      .repeat(2)
      .collect()

      expect(value1).toEqual(['a', 'b', 'c', 'a', 'b', 'c'])
      expect(value2).toEqual(value1)
  })

  it('works with arrayLikes', () => {
    const arrayLike = {
      0: 0,
      1: 1,
      length: 2
    }

    const value1 = repeat(arrayLike, 2)
      .collect()
    const value2 = new XIterable(arrayLike)
      .repeat(2)
      .collect()

      expect(value1).toEqual([0, 1, 0, 1])
      expect(value2).toEqual(value1)
  })

  it('works with generators', () => {
    const generator = function* () {
      yield true
    }

    const value1 = repeat(generator, 2)
      .collect()
    const value2 = new XIterable(generator)
      .repeat(2)
      .collect()

      expect(value1).toEqual([true, true])
      expect(value2).toEqual(value1)
  })

  it('will work with a single argument', () => {
    const value1 = repeat([1])
    const value2 = new XIterable([1])
      .repeat()

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
