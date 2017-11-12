import { reduce, Sequence } from '../src'

const sum = (a, b) => a + b

describe('reduce', () => {
  it('reduces the collection to a single value', () => {
    const array = [1, 2, 3]
    const arrayLike = { 0: 1, length: 1 }
    const generator = function* (): IterableIterator<number> {
      yield 1
      yield 2
    }
    const empty: number[] = []

    expect(reduce(array, sum)).toBe(6)
    expect(new Sequence(array).reduce(sum)).toBe(6)

    expect(reduce(arrayLike, sum)).toBe(1)
    expect(new Sequence(arrayLike).reduce(sum)).toBe(1)

    expect(reduce(generator, sum)).toBe(3)
    expect(new Sequence(generator).reduce(sum)).toBe(3)

    expect(reduce(empty, sum)).toBe(undefined)
    expect(new Sequence(empty).reduce(sum)).toBe(undefined)
  })
})
