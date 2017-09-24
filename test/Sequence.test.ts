import { Sequence } from '../src'

describe('Sequence', () => {
  it('can be constructed using an Iterable', () => {
    const fromArray = new Sequence([1, 2, 3])
    const fromString = new Sequence('abcd')

    expect(fromArray.toArray()).toEqual([1, 2, 3])
    expect(fromString.toArray()).toEqual(['a', 'b', 'c', 'd'])
  })

  it('can be constructed using an ArrayLike', () => {
    const fromArrayLike = new Sequence({
      0: true,
      1: false,
      length: 2
    })

    expect(fromArrayLike.toArray()).toEqual([true, false])
  })

  it('can be constructed using an generator function', () => {
    const fromGenerator = new Sequence(function* () {
      yield 1
      yield 2
      yield 3
    })

    expect(fromGenerator.toArray()).toEqual([1, 2, 3])
  })
})
