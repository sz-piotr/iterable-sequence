import XIterable from './XIterable'

describe('XIterable', () => {
  it('can be constructed using an Iterable', () => {
    const fromArray = new XIterable([1, 2, 3])
    const fromString = new XIterable('abcd')

    expect(fromArray.collect()).toEqual([1, 2, 3])
    expect(fromString.collect()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('can be constructed using an ArrayLike', () => {
    const fromArrayLike = new XIterable({
      0: true,
      1: false,
      length: 2
    })

    expect(fromArrayLike.collect()).toEqual([true, false])
  })

  it('can be constructed using an generator function', () => {
    const fromGenerator = new XIterable(function* () {
      yield 1
      yield 2
      yield 3
    })

    expect(fromGenerator.collect()).toEqual([1, 2, 3])
  })
})
