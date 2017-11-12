import { append, Sequence } from '../src'

describe('append', () => {
  it('accepts two Collections as argument', () => {
    const iterableCollection = [1, 2, 3]
    const arrayLikeCollection = { 0: 1, 1: 2, length: 2 }
    const generatorCollection = function* () { yield 1 }

    expect(append(iterableCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(append(iterableCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(append(iterableCollection, generatorCollection)).toBeInstanceOf(Sequence)

    expect(append(arrayLikeCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(append(arrayLikeCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(append(arrayLikeCollection, generatorCollection)).toBeInstanceOf(Sequence)

    expect(append(generatorCollection, iterableCollection)).toBeInstanceOf(Sequence)
    expect(append(generatorCollection, arrayLikeCollection)).toBeInstanceOf(Sequence)
    expect(append(generatorCollection, generatorCollection)).toBeInstanceOf(Sequence)
  })

  it('creates an Sequence with concatenated collection elements', () => {
    const value1 = append('abc', [1, 2, 3]).toArray()
    const value2 = new Sequence('abc').append([1, 2, 3]).toArray()

    expect(value1).toEqual(['a', 'b', 'c', 1, 2, 3])
    expect(value2).toEqual(value1)
  })
})
