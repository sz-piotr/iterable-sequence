import { zip, XIterable } from '../src'

describe('zip', () => {
  it('works with iterables', () => {
    const value1 = zip('abcd', [1, 2, 3]).collect()
    const value2 = new XIterable('abcd').zip([1, 2, 3]).collect()

    expect(value1).toEqual([['a', 1], ['b', 2], ['c', 3]])
    expect(value2).toEqual(value1)
  })

  it('works with arrayLikes', () => {
    const a = {
      0: 0,
      length: 1
    }
    const b = {
      0: true,
      1: false,
      length: 2
    }
    const value1 = zip(a, b).collect()
    const value2 = new XIterable(a).zip(b).collect()

    expect(value1).toEqual([[0, true]])
    expect(value2).toEqual(value1)
  })

  it('works with generators', () => {
    function* a() {
      yield 1
    }
    function* b() {
      yield 2
    }
    const value1 = zip(a, b)
      .collect()
    const value2 = new XIterable(a)
      .zip(b)
      .collect()

    expect(value1).toEqual([[1, 2]])
    expect(value2).toEqual(value1)
  })
})
