import { zip, XIterable } from '../src'

describe('zip', () => {
  it('accepts two sequences as argument', () => {
    const iterableSequence = [1, 2, 3]
    const arrayLikeSequence = { 0: 1, 1: 2, length: 2 }
    const generatorSequence = function* () { yield 1 }

    expect(zip(iterableSequence, iterableSequence)).toBeInstanceOf(XIterable)
    expect(zip(iterableSequence, arrayLikeSequence)).toBeInstanceOf(XIterable)
    expect(zip(iterableSequence, generatorSequence)).toBeInstanceOf(XIterable)

    expect(zip(arrayLikeSequence, iterableSequence)).toBeInstanceOf(XIterable)
    expect(zip(arrayLikeSequence, arrayLikeSequence)).toBeInstanceOf(XIterable)
    expect(zip(arrayLikeSequence, generatorSequence)).toBeInstanceOf(XIterable)

    expect(zip(generatorSequence, iterableSequence)).toBeInstanceOf(XIterable)
    expect(zip(generatorSequence, arrayLikeSequence)).toBeInstanceOf(XIterable)
    expect(zip(generatorSequence, generatorSequence)).toBeInstanceOf(XIterable)
  })

  it('creates an XIterable with tuples made out of given sequences', () => {
    const value1 = zip('abc', [1, 2, 3]).collect()
    const value2 = new XIterable('abc').zip([1, 2, 3]).collect()

    expect(value1).toEqual([['a', 1], ['b', 2], ['c', 3]])
    expect(value2).toEqual(value1)
  })

  it('creates an XIterable of length equal to the length of the smaller sequence', () => {
    const value = zip([1, 2], [1, 2, 3]).collect()

    expect(value).toEqual([[1, 1], [2, 2]])
  })
})
