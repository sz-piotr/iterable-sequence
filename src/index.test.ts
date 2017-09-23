import { XIterable, range, zip } from './index'

describe('XIterable', () => {
  describe('XIterable.constructor', () => {
    it('works with Iterable', () => {
      const value = new XIterable([1, 2, 3]).collect()
      expect(value).toEqual([1, 2, 3])
    })

    it('works with ArrayLike', () => {
      const value = new XIterable({ 0: 0, 1: 1, length: 2 }).collect()
      expect(value).toEqual([0, 1])
    })

    it('works without arguments', () => {
      const value = new XIterable().collect()
      expect(value).toEqual([])
    })
  })

  test('XIterable.forEach', () => {
    const mockFn = jest.fn()
    new XIterable([1, 2, 3]).forEach(mockFn)
    expect(mockFn.mock.calls).toEqual([[1, 0], [2, 1], [3, 2]])
  })

  test('XIterable.reduce', () => {
    const value = new XIterable([1, 2, 3])
      .reduce((a, b) => a + b)
    expect(value).toEqual(6)
  })

  test('XIterable.map', () => {
    const value = new XIterable([1, 2, 3])
      .map((x, index) => x * index)
      .collect()
    expect(value).toEqual([0, 2, 6])
  })

  test('XIterable.flatMap', () => {
    const value = new XIterable('abc')
      .flatMap((char, index) => [char, index])
      .collect()
    expect(value).toEqual(['a', 0, 'b', 1, 'c', 2])
  })

  test('XIterable.filter', () => {
    const value = range(5)
      .filter((value, index) => value + index < 5)
      .collect()
    expect(value).toEqual([0, 1, 2])
  })

  test('XIterable.take', () => {
    const value = range(Infinity)
      .take(3)
      .collect()
    expect(value).toEqual([0, 1, 2])
  })
})

describe('range', () => {
  it('works with a single argument (end)', () => {
    const value = range(5).collect()
    expect(value).toEqual([0, 1, 2, 3, 4])
  })

  it('works with a two arguments (start, end)', () => {
    const value = range(2, 5).collect()
    expect(value).toEqual([2, 3, 4])
  })

  it('works with a three arguments ascending (start, next, end)', () => {
    const up = range(0, 2, 5).collect()
    expect(up).toEqual([0, 2, 4])
  })

  it('works with a three arguments descending (start, next, end)', () => {
    const up = range(5, 4, 0).collect()
    expect(up).toEqual([5, 4, 3, 2, 1])
  })
})

describe('zip', () => {
  it('works with Iterables', () => {
    const value = zip([1, 2, 3], ['a', 'b']).collect()
    expect(value).toEqual([[1, 'a'], [2, 'b']])
  })

  it('works with XIterables', () => {
    const value = zip('boom', range(Infinity)).collect()
    expect(value).toEqual([
      ['b', 0],
      ['o', 1],
      ['o', 2],
      ['m', 3],
    ])
  })

  it('works with ArrayLikes', () => {
    const arrayLikeA = { 0: 1, 1: 2, 2: 3, length: 3 }
    const arrayLikeB = { 0: 'a', 1: 'b', length: 2 }

    const value = zip(arrayLikeA, arrayLikeB).collect()
    expect(value).toEqual([[1, 'a'], [2, 'b']])
  })
})
