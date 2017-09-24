import { zip, Sequence } from '../src'

describe('zip', () => {
  it('accepts two Collections as argument', () => {
    const iterableCollection = [1, 2, 3]
    const arrayLikeCollection = { 0: 1, 1: 2, length: 2 }
    const generatorCollection = function* () { yield 1 }

    expect(zip(iterableCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(zip(iterableCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(zip(iterableCollection, generatorCollection)).toBeInstanceOf(Sequence)

    expect(zip(arrayLikeCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(zip(arrayLikeCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(zip(arrayLikeCollection, generatorCollection)).toBeInstanceOf(Sequence)

    expect(zip(generatorCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(zip(generatorCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(zip(generatorCollection, generatorCollection)).toBeInstanceOf(Sequence)
  })

  it('creates an Sequence with tuples made out of given Collections', () => {
    const value1 = zip('abc', [1, 2, 3]).toArray()
    const value2 = new Sequence('abc').zip([1, 2, 3]).toArray()

    expect(value1).toEqual([['a', 1], ['b', 2], ['c', 3]])
    expect(value2).toEqual(value1)
  })

  it('creates an Sequence of length equal to the length of the smaller Collection', () => {
    const value = zip([1, 2], [1, 2, 3]).toArray()

    expect(value).toEqual([[1, 1], [2, 2]])
  })
})
