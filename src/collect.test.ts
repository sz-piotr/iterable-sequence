import collect from './collect'
import XIterable from './XIterable'

describe('collect', () => {
  it('collects iterables', () => {
    const value1 = collect([1, 2, 3])
    const value2 = new XIterable([1, 2, 3]).collect()

    expect(value1).toEqual([1, 2, 3])
    expect(value2).toEqual(value1)
  })

  it('collects arrayLike', () => {
    const arrayLike = {
      0: true,
      1: false,
      length: 2
    }
    const value1 = collect(arrayLike)
    const value2 = new XIterable(arrayLike).collect()

    expect(value1).toEqual([true, false])
    expect(value2).toEqual(value1)
  })

  it('collects generators', () => {
    const generator = function* (){
      yield 1
      yield 2
      yield 3
    }
    const value1 = collect(generator)
    const value2 = new XIterable(generator).collect()

    expect(value1).toEqual([1, 2, 3])
    expect(value2).toEqual(value1)
  })
})
