import { xiter, range, zip } from './index'

describe('xiter', () => {
  it('works with Iterable', () => {
    const value = xiter([1, 2, 3]).collect()
    expect(value).toEqual([1, 2, 3])
  })

  it('works with ArrayLike', () => {
    const value = xiter({
      0: 0,
      1: 1,
      length: 2
    }).collect()
    expect(value).toEqual([0, 1])
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
