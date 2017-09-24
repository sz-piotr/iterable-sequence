[![Build Status](https://travis-ci.org/sz-piotr/Sequences.svg?branch=master)](https://travis-ci.org/sz-piotr/Sequences)
[![Coverage Status](https://coveralls.io/repos/github/sz-piotr/Sequences/badge.svg?branch=master)](https://coveralls.io/github/sz-piotr/Sequences?branch=master)

# Sequences

A utility library for working with iterables in modern JavaScript and TypeScript.

## Core features

1. *Lazy* - values are computed only when they are actually used
2. *No mutation* - functions and methods don't modify their arguments or internal state of their objects
3. *User friendly API* - methods that you are already familiar with
4. *Types* - the library was written in TypeScript and compiled with the `--strict` option

## Motivation

With the ES2015 specification came the iteration protocol allowing us to write `for..of` loops in JavaScript. However the built in language APIs do not provide some useful features that the use of the protocol enables.

The fundamental difference between working with iterables and working with arrays is that an iterable does not need an underlying data structure. This opens up the possibility for ranges, infinite Collections, data manipulation without copying entire data structures and many more.

## Examples

TODO

# API

## Index

- [`Collection`](#Collection)
- [`Sequence`](#Sequence)
- [`collect`](#collect)
- [`range`](#range)
- [`repeat`](#repeat)
- [`repeatValue`](#repeatvalue)
- [`zip`](#zip)
- [`map`](#map)

## `Collection`

```typescript
type Collection<T> = Iterable<T> | ArrayLike<T> | (() => Iterator<T>)
```

The `Collection` type is used all across the library. Objects of this type represent a collection of values, but they can represent it in different ways. `Iterable` objects have a property `@@iterator` that allows for iteration in a `for..of` loop. `ArrayLike` objects have numeric keys and a `length` property. `() => Iterator<T>` is a type that denotes a generator function (created using `function*`).

The values of a collection can also be collections themselves.

Examples of `Collection` types:

```typescript
const arrayCollection = [1, 2, 3, 4]

const stringCollection = 'abcde' // note: the values are the characters!

const arrayLikeCollection = {
  0: true,
  1: false,
  2: true,
  length: 3
}

const generatorCollection = function* () {
  yield [1, 2, 3, 4] // note: the array is a single value of this collection
  yield [5, 6, 7]
  yield [8, 9]
  yield [10]
}
```


## `Sequence`

```typescript
class Sequence<T> implements Iterable<T>
Sequence<T>.constructor(Collection: Collection<T>)
```

The `Sequence` class is the main building block of the library. It encapsulates a `Collection` object allowing for expressing data manipulations in the form of method chaining. 

An `Sequence` Collection is lazy. No values are computed unless you want to use them. This is because `Sequence` uses generator functions internally. This opens up the possibility for infinite seqences as they don't store their values anywhere and compute them on demand.

All `Sequence` methods have their equivalents in the form of standalone functions of the same name.

To obtain an `Sequence` just use the constructor like so:

```typescript
import { Sequence } from 'Sequences'

const mySequence = new Sequence([1, 2, 3])
```


## `collect`

```typescript
function collect<T>(Collection: Collection<T>): T[]
Sequence<T>.collect(): T[]
```

`collect` is a function that allows to retrieve values from a Collection. It iterates over the Collection creating an array of values in the process.

Example:

```typescript
import { collect, Sequence } from 'Sequences'

const myCollection = function* () {
  yield 1
  yield 2
  yield 3
}

const values = collect(myCollection)
// or
const values = new Sequence(myCollection).collect()

console.log(values) // outputs: [1, 2, 3]
```


## `range`

```typescript
function range(end: number): Sequence<number>
function range(start: number, end: number): Sequence<number>
function range(start: number, next: number, end: number): Sequence<number>
```

`range` is used to create Collections whoose values follow a linear progression. This includes creating lists of consecutive integers, all even numbers or counting from 100 to 0.

The created Collection can also be descending or infinite.

Example:

```typescript
import { range } from 'Sequences'

const oneArgument = range(5) // 0, 1, 2, 3, 4
const twoArguments = range(2, 5) // 2, 3, 4
const threeArguments = range(0, 2, 7) // 0, 2, 4, 6

const descending = range(5, 4, 0) // 5, 4, 3, 2, 1
const infinite = range(Infinity) // 0, 1, 2, 3, ...
```


## `repeat`

```typescript
function repeat<T>(Collection: Collection<T>, times?: number): Sequence<T>
Sequence<T>.repeat(times?: number): Sequence<T>
```

`repeat` is used to create Collections that are a repetition of the one provided as argument. The second argument controls how many times the Collection is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeat, Sequence } from 'Sequences'

for(const value of repeat([1, 2])) {
  console.log(value) // outputs: 1, 2, 1, 2, 1, 2, ...
}

const values = new Sequence('abc')
  .repeat(3)
  .collect()
  .join('')

console.log(values) // outputs: 'abcabcabc'
```


## `repeatValue`

```typescript
function repeatValue<T>(value: T, times?: number): Sequence<T>
```

`repeatValue` is similar to `repeat` but it treats it first argument as a single value. The second argument controls how many times the value is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeatValue } from 'Sequences'

for(const value of repeatValue(3, 5)) {
  console.log(value) // outputs: 3, 3, 3, 3, 3
}
```


## `zip`

```typescript
function zip<T, U>(a: Collection<T>, b: Collection<U>): Sequence<[T, U]>
Sequence<T>.zip<U>(Collection: Collection<U>): Sequence<[T, U]>
```

`zip` is used to join two Collections into one. The resulting Collection consists of pairs of values and has the length of the shorter of the two provided.

Example:

```typescript
import { range } from 'Sequences'

const thisAndNext = range(3)
  .zip(range(1, 4))
  .collect()

console.log(thisAndNext) // [[0, 1], [1, 2], [2, 3]]
```


## `map`

```typescript
function map<T, U>(Collection: Collection<T>, fn: (value: T, index: number) => U): Sequence<U>
Sequence<T>.map<U>(fn: (value: T, index: number) => U): Sequence<U>
```

`map` is used to replace values in a Collection with the results of the function it receives as an argument.

Example:

```typescript
import { map } from 'Sequences'

const lettersWithNumbers = map(
  'abc',
  (letter, index) => `${letter}-${index}`
).collect()

console.log(lettersWithNumbers) // ['a-1', 'b-2', 'c-3']
```

