export type MaybeIterable<T> = Iterable<T> | ArrayLike<T>


export const xiter: <T> (iterable: MaybeIterable<T>) => XIterable<T>
  = (iterable) => new WrappedIterable(iterable)

export const range: (a: number, b?: number, c?: number)  => XIterable<number>
  = (a, b, c) => new RangeIterable(a, b, c)

export const zip: <T, U> (a: MaybeIterable<T>, b: MaybeIterable<U>) => XIterable<[T, U]>
  = (a, b) => new ZipIterable(a, b)


export abstract class XIterable<T> implements Iterable<T> {
  *[Symbol.iterator](): Iterator<T> {}

  map <U> (fn: (item: T) => U): XIterable<U> {
    return new MapIterable(this, fn)
  }

  flatMap <U> (fn: (item: T) => MaybeIterable<U>): XIterable<U> {
    return new FlatMapIterable(this, fn)
  }

  filter (fn: (item: T) => boolean): XIterable<T> {
    return new FilterIterable(this, fn)
  }

  takeWhile (fn: (item: T) => boolean): XIterable<T> {
    return new TakeWhileIterable(this, fn)
  }

  dropWhile (fn: (item: T) => boolean): XIterable<T> {
    return new DropWhileIterable(this, fn)
  }

  zip <U> (iterable: MaybeIterable<U>): XIterable<[T, U]> {
    return new ZipIterable(this, iterable)
  }

  append <U> (iterable: MaybeIterable<U>): XIterable<T | U> {
    return new AppendIterable(this, iterable)
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


function isIterable(arg: any): arg is Iterable<any> {
  return arg.hasOwnProperty(Symbol.iterator)
}


class WrappedIterable<T> extends XIterable<T> {
  constructor(iterable: MaybeIterable<T>) {
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


class RangeIterable extends XIterable<number> {
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


class MapIterable<T, U> extends XIterable<U> {
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


class FlatMapIterable<T, U> extends XIterable<U> {
  constructor(
    private iterable: Iterable<T>,
    private fn: (item: T) => MaybeIterable<U>)
  {
    super()
  }

  *[Symbol.iterator]() {
    for(const value of this.iterable) {
      const result = this.fn(value)
      const iterable = isIterable(result) ? result : new WrappedIterable(result)
      for(const nestedValue of iterable) {
        yield nestedValue
      }
    }
  }
}


class FilterIterable<T> extends XIterable<T> {
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

class TakeWhileIterable<T> extends XIterable<T> {
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


class DropWhileIterable<T> extends XIterable<T> {
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


class ZipIterable<T, U> extends XIterable<[T, U]> {
  private a: Iterable<T>
  private b: Iterable<U>

  constructor(a: MaybeIterable<T>, b: MaybeIterable<U>) {
    super()
    this.a = isIterable(a) ? a : new WrappedIterable(a)
    this.b = isIterable(b) ? b : new WrappedIterable(b)
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


class AppendIterable<T, U> extends XIterable<T | U> {
  b: Iterable<U>

  constructor(
    private a: Iterable<T>,
    b: MaybeIterable<U>
  ) {
    super()
    this.b = isIterable(b) ? b : new WrappedIterable(b)
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
