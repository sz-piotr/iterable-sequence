import { range, Sequence } from '../src'

describe('range', () => {
  it('works with a single argument', () => {
    const value = range(5).toArray()
    expect(value).toEqual([0, 1, 2, 3, 4])
  })

  it('works with a two arguments', () => {
    const value = range(2, 5).toArray()
    expect(value).toEqual([2, 3, 4])
  })

  it('works with a three arguments', () => {
    const ascending = range(0, 5, 2).toArray()
    const descending = range(5, 0, -1).toArray()
    expect(ascending).toEqual([0, 2, 4])
    expect(descending).toEqual([5, 4, 3, 2, 1])
  })
})
