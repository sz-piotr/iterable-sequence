import collect from './collect'
import XIterable from './XIterable'

describe('collect', () => {
  it('collects iterables', () => {
    expect(collect([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('collects arrayLike', () => {
    expect(collect({
      0: true,
      1: false,
      length: 2
    })).toEqual([true, false])
  })

  it('collects generators', () => {
    expect(collect(function* (){
      yield 1
      yield 2
      yield 3
    })).toEqual([1, 2, 3])
  })
})

test('XIterable.collect', () => {
  expect(
    new XIterable([1, 2, 3]).collect()
  ).toEqual([1, 2, 3])
})
