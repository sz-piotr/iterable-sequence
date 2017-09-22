type MaybeIterable<T> = Iterable<T> | ArrayLike<T>

export default {
  from: <T> (iterable: MaybeIterable<T>): IteratorBase<T> =>
    new WrapperIterator(iterable),

  range: (a: number, b?: number, c?: number): IteratorBase<number> =>
    new RangeIterator(a, b, c),

  zip: <T, U> (a: MaybeIterable<T>, b: MaybeIterable<U>): IteratorBase<[T, U]> =>
    new ZipIterator(a, b),
}

function isIterable(arg: any): arg is Iterable<any> {
  return arg.hasOwnProperty(Symbol.iterator)
}


export class IteratorBase<T> implements Iterable<T> {
  *[Symbol.iterator](): Iterator<T> {}

  map <U> (fn: (item: T) => U): IteratorBase<U> {
    return new MapIterator(this, fn)
  }

  flatMap <U> (fn: (item: T) => Iterable<U>): IteratorBase<U> {
    return new FlatMapIterator(this, fn)
  }

  filter (fn: (item: T) => boolean): IteratorBase<T> {
    return new FilterIterator(this, fn)
  }

  takeWhile (fn: (item: T) => boolean): IteratorBase<T> {
    return new TakeWhileIterator(this, fn)
  }

  dropWhile (fn: (item: T) => boolean): IteratorBase<T> {
    return new DropWhileIterator(this, fn)
  }

  zip <U> (iterable: Iterable<U>): IteratorBase<[T, U]> {
    return new ZipIterator(this, iterable)
  }

  append(iterable: Iterable<T>): IteratorBase<T> {
    return new AppendIterator(this, iterable)
  }

  reduce (fn: (accumulator: T, currentValue: T) => T | undefined) {
    let result
    let first = true
    for(const value of this) {
      if(first) {
        result = value
        first = false
      } else {
        result = fn(<T>result, value)
      }
    }
    return result
  }

  collect() {
    const array = []
    for(const value of this) {
      array.push(value)
    }
    return array
  }
}


class WrapperIterator<T> extends IteratorBase<T> {
  constructor(iterable: MaybeIterable<any>) {
    super()
    this[Symbol.iterator] = isIterable(iterable) ?
      () => iterable[Symbol.iterator]() :
      function* () {
        for(let i = 0; i < iterable.length; i++) {
          yield iterable[i]
        }
      }
  }
}


class RangeIterator extends IteratorBase<number> {
  private start: number
  private stop: number
  private step: number

  constructor(a: number, b?: number, c?: number) {
    super()
    if(b !== undefined) {
      if(c !== undefined) {
        this.start = a
        this.step = b
        this.stop = c
      } else {
        this.start = a
        this.stop = b
      }
    } else {
      this.start = 0
      this.step = 1
      this.stop = a
    }
  }

  *[Symbol.iterator]() {
    for(let i = this.start; i < this.stop; i += this.step) {
      yield i
    }
  }
}


class MapIterator<T, U> extends IteratorBase<U> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => U
  ) {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      yield this.fn(value)
    }
  }
}


class FlatMapIterator<T, U> extends IteratorBase<U> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => Iterable<U>)
  {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      for(const nestedValue of this.fn(value)) {
        yield nestedValue
      }
    }
  }
}


class FilterIterator<T> extends IteratorBase<T> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => boolean
  ) {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      if(this.fn(value)) {
        yield value
      }
    }
  }
}

class TakeWhileIterator<T> extends IteratorBase<T> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => boolean
  ) {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      if(!this.fn(value)) {
        break
      }
      yield value
    }
  }
}


class DropWhileIterator<T> extends IteratorBase<T> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => boolean
  ) {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      if(this.fn(value)) {
        continue
      }
      yield value
    }
  }
}


class ZipIterator<T, U> extends IteratorBase<[T, U]> {
  private a: Iterable<T>
  private b: Iterable<U>

  constructor(a: MaybeIterable<T>, b: MaybeIterable<U>) {
    super()
    this.a = isIterable(a) ? a : new WrapperIterator(a)
    this.b = isIterable(b) ? b : new WrapperIterator(b)
  }

  *[Symbol.iterator](): Iterator<[T, U]> {
    const aIterator = this.a[Symbol.iterator]()
    const bIterator = this.b[Symbol.iterator]()

    let a = aIterator.next()
    let b = bIterator.next()
    while(!a.done && !b.done) {
      yield [a.value, b.value]
      a = aIterator.next()
      b = bIterator.next()
    }
  }
}


class AppendIterator<T, U> extends IteratorBase<T | U> {
  b: Iterable<U>

  constructor(
    private a: Iterable<T>,
    b: MaybeIterable<U>
  ) {
    super()
    this.b = isIterable(b) ? b : new WrapperIterator(b)
  }

  *[Symbol.iterator]() {
    for(const value of this.a) {
      yield value
    }

    for(const value of this.b) {
      yield value
    }
  }
}
