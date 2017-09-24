[![Build Status](https://travis-ci.org/sz-piotr/xiterables.svg?branch=master)](https://travis-ci.org/sz-piotr/xiterables)

# XIterables

A utility library for working with iterables in modern JavaScript and TypeScript.

## Core features

1. *Lazy* - values are computed only when they are actually used
2. *No mutation* - functions and methods don't modify their arguments or internal state of their objects
3. *User friendly API* - methods that you are already familiar with
4. *Types* - the library was written in TypeScript and compiled with the `--strict` option

## Motivation

With the ES2015 specification came the iteration protocol allowing us to write `for..of` loops in JavaScript. However the built in language APIs do not provide some useful features that the use of the protocol enables.

The fundamental difference between working with iterables and working with arrays is that an iterable does not need an underlying data structure. This opens up the possibility for ranges, infinite sequences, data manipulation without copying entire data structures and many more.

## Examples

TODO

# API

## Index

- [`Sequence`](#sequence)
- [`XIterable`](#xiterable)
- [`collect`](#collect)
- [`range`](#range)
- [`repeat`](#repeat)
- [`repeatValue`](#repeatvalue)
- [`zip`](#zip)
- [`map`](#map)

## `Sequence`

```typescript
type Sequence<T> = Iterable<T> | ArrayLike<T> | (() => Iterator<T>)
```

The `Sequence` type is used all across the library. Objects of this type represent a seqence of values, but they can represent it indifferent ways. `Iterable` objects have a property `@@iterator` that allows for iteration in a `for..of` loop. `ArrayLike` objects have numeric keys and a `length` property. `() => Iterator<T>` is a type that denotes a generator function (created using `function*`).

The values of the sequence can also be sequences themselves.

Examples of `Sequence` types:

```typescript
const arraySequence = [1, 2, 3, 4]

const stringSequence = 'abcde'

const arrayLikeSequence = {
  0: true,
  1: false,
  2: true,
  length: 3
}

const generatorSequence = function* () {
  yield [1, 2, 3, 4]
  yield [5, 6, 7]
  yield [8, 9]
  yield [10]
}
```


## `XIterable`

```typescript
class XIterable<T> implements Iterable<T>
XIterable<T>.constructor(sequence: Sequence<T>)
```

The `XIterable` class is the main building block of the library. It encapsulates a `Sequence` object allowing for expressing data manipulations in the form of method chaining. 

An `XIterable` sequence is lazy. No values are computed unless you want to use them. This is because `XIterable` uses generator functions internally. This opens up the possibility for infinite seqences as they don't store their values anywhere and compute them on demand.

All `XIterable` methods have their equivalents in the form of standalone functions of the same name.

To obtain an `XIterable` just use the constructor like so:

```typescript
import { XIterable } from 'xiterables'

const myXIterable = new XIterable([1, 2, 3])
```


## `collect`

```typescript
function collect<T>(sequence: Sequence<T>): T[]
XIterable<T>.collect(): T[]
```

`collect` is a function that allows to retrieve values from a sequence. It iterates over the sequence creating an array of values in the process.

Example:

```typescript
import { collect, XIterable } from 'xiterables'

const mySequence = function* () {
  yield 1
  yield 2
  yield 3
}

const values = collect(mySequence)
// or
const values = new XIterable(mySequence).collect()

console.log(values) // outputs: [1, 2, 3]
```


## `range`

```typescript
function range(end: number): XIterable<number>
function range(start: number, end: number): XIterable<number>
function range(start: number, next: number, end: number): XIterable<number>
```

`range` is used to create sequences whoose values follow a linear progression. This includes creating lists of consecutive integers, all even numbers or counting from 100 to 0.

The created sequence can also be descending or infinite.

Example:

```typescript
import { range } from 'xiterables'

const oneArgument = range(5) // 0, 1, 2, 3, 4
const twoArguments = range(2, 5) // 2, 3, 4
const threeArguments = range(0, 2, 7) // 0, 2, 4, 6

const descending = range(5, 4, 0) // 5, 4, 3, 2, 1
const infinite = range(Infinity) // 0, 1, 2, 3, ...
```


# `repeat`

```typescript
function repeat<T>(sequence: Sequence<T>, times?: number): XIterable<T>
XIterable<T>.repeat(times?: number): XIterable<T>
```

`repeat` is used to create sequences that are a repetition of the one provided as argument. The second argument controls how many times the sequence is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeat, XIterable } from 'xiterables'

for(const value of repeat([1, 2])) {
  console.log(value) // outputs: 1, 2, 1, 2, 1, 2, ...
}

const values = new XIterable('abc')
  .repeat(3)
  .collect()
  .join('')

console.log(values) // outputs: 'abcabcabc'
```


# `repeatValue`

```typescript
function repeatValue<T>(value: T, times?: number): XIterable<T>
```

`repeatValue` is similar to `repeat` but it treats it first argument as a single value. The second argument controls how many times the value is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeatValue } from 'xiterables'

for(const value of repeatValue(3, 5)) {
  console.log(value) // outputs: 3, 3, 3, 3, 3
}
```


# `zip`

```typescript
function zip<T, U>(a: Sequence<T>, b: Sequence<U>): XIterable<[T, U]>
XIterable<T>.zip<U>(sequence: Sequence<U>): XIterable<[T, U]>
```

`zip` is used to join two sequences into one. The resulting sequence consists of pairs of values and has the length of the shorter of the two provided.

Example:

```typescript
import { range } from 'xiterables'

const thisAndNext = range(3)
  .zip(range(1, 4))
  .collect()

console.log(thisAndNext) // [[0, 1], [1, 2], [2, 3]]
```


# `map`

```typescript
function map<T, U>(sequence: Sequence<T>, fn: (value: T, index: number) => U): XIterable<U>
XIterable<T>.map<U>(fn: (value: T, index: number) => U): XIterable<U>
```

`map` is used to replace values in a sequence with the results of the function it receives as an argument.

Example:

```typescript
import { map } from 'xiterables'

const lettersWithNumbers = map(
  'abc',
  (letter, index) => `${letter}-${index}`
).collect()

console.log(lettersWithNumbers) // ['a-1', 'b-2', 'c-3']
```

