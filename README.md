[![Build Status](https://travis-ci.org/sz-piotr/iterable-sequence.svg?branch=master)](https://travis-ci.org/sz-piotr/iterable-sequence)
[![Coverage Status](https://coveralls.io/repos/github/sz-piotr/iterable-sequence/badge.svg?branch=master&n=0)](https://coveralls.io/github/sz-piotr/iterable-sequence?branch=master)
[![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/iterable-sequence.svg)](https://www.npmjs.com/package/iterable-sequence)

# Iterable Sequence

A utility library for working with iterables in modern JavaScript and TypeScript.

## Core features

1. *Lazy* - values are computed only when they are actually used
2. *No mutation* - functions and methods don't modify their arguments or internal state of their objects
3. *User friendly API* - intuitive names and exhaustive documentation
4. *Types* - the library was written in TypeScript and compiled with the `--strict` option

## Installation

The library is published on npm. To use it in your own project run
```
npm install --save iterable-sequence
```

Then you can use the library like so:
```typescript
// es2015 or TypeScript
import { range } from 'iterable-sequence'

for(const value of range(5)) {
  console.log(value) // outputs: 0, 1, 2, 3, 4
}
```

```javascript
// es5
var seq = require('iterable-sequence')

var values = seq.range(5).toArray()
console.log(values) // outputs: 0, 1, 2, 3, 4
```

You can also use the provided script directly in the browser:
```html
<script src="https://cdn.rawgit.com/sz-piotr/iterable-sequence/905ec730/lib/iterable-sequence.js"></script>
<script>
  var values = seq.range(5).toArray()
  console.log(values) // outputs: 0, 1, 2, 3, 4
</script>
```

## Motivation

With the ES2015 specification came the iteration protocol allowing us to write `for..of` loops in JavaScript. However the built in language APIs do not provide some useful features that the use of the protocol enables.

The fundamental difference between working with iterables and working with arrays is that an iterable does not need an underlying data structure. This opens up the possibility for ranges, infinite Collections, data manipulation without copying entire data structures and many more.

## Examples

TODO

# API

## Index

- [`Collection`](#collection)
- [`Sequence`](#sequence)
- [`Sequence.toArray`](#sequencetoarray)
- [`Sequence.join`](#sequencejoin)
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

Examples of `Collection` objects:

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
Sequence<T>.constructor(collection: Collection<T>)
```

The `Sequence` class is the main building block of the library. It encapsulates a `Collection` object allowing for expressing data manipulations in the form of method chaining. 

An `Sequence` object is lazy. No values are computed unless you want to use them. This is because `Sequence` uses generator functions internally. This opens up the possibility for infinite seqences as they don't store their values anywhere and compute them on demand.

Most `Sequence` methods have their equivalents in the form of standalone functions of the same name.

To obtain an `Sequence` just use the constructor like so:

```typescript
import { Sequence } from 'iterable-sequence'

const mySequence = new Sequence([1, 2, 3])
```


## `Sequence.toArray`

```typescript
Sequence<T>.toArray(): T[]
```

`.toArray` is a function that allows to retrieve values from a `Sequence`. It iterates over the `Sequence` creating an array of values in the process.

Example:

```typescript
import { Sequence } from 'iterable-sequence'

const values = new Sequence('abc').toArray()
console.log(values) // outputs: ['a', 'b', 'c']
```


## `Sequence.join`

```typescript
Sequence<T>.join(separator?: string): string
```

`.join` is a function that concatenates the string representation of the `Sequence` values creating a larger string in the process. When no separator is provided an empty string is used.

Example:

```typescript
import { Sequence } from 'iterable-sequence'

const value = new Sequence([1, 2, 3]).join('-')
console.log(value) // outputs: '1-2-3'
```


## `range`

```typescript
function range(end: number): Sequence<number>
function range(start: number, end: number): Sequence<number>
function range(start: number, next: number, end: number): Sequence<number>
```

`range` is a function that creates a `Sequence` of integer values that follow a linear progression.

The created `Sequence` can also be descending or infinite.

Example:

```typescript
import { range } from 'iterable-sequence'

const oneArgument = range(5) // 0, 1, 2, 3, 4
const twoArguments = range(2, 5) // 2, 3, 4
const threeArguments = range(0, 2, 7) // 0, 2, 4, 6

const descending = range(5, 4, 0) // 5, 4, 3, 2, 1
const infinite = range(Infinity) // 0, 1, 2, 3, ...
```


## `repeat`

```typescript
function repeat<T>(collection: Collection<T>, times?: number): Sequence<T>
Sequence<T>.repeat(times?: number): Sequence<T>
```

`repeat` creates a `Sequence` with values taken from a given `Collection` and repeated. The second argument controls how many times the `Collection` is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeat } from 'iterable-sequence'

for(const value of repeat([1, 2])) {
  console.log(value) // outputs: 1, 2, 1, 2, 1, 2, ...
}

const tripleABC = repeat('abc', 3).join()
console.log(tripleABC) // outputs: 'abcabcabc'
```


## `repeatValue`

```typescript
function repeatValue<T>(value: T, times?: number): Sequence<T>
```

`repeatValue` is similar to `repeat` but it treats it first argument as a single value. The second argument controls how many times the value is repeated. If you omit the argument it defaults to `Infinity`.

Example:

```typescript
import { repeatValue } from 'iterable-sequence'

for(const value of repeatValue(3, 5)) {
  console.log(value) // outputs: 3, 3, 3, 3, 3
}
```


## `zip`

```typescript
function zip<T, U>(a: Collection<T>, b: Collection<U>): Sequence<[T, U]>
Sequence<T>.zip<U>(collection: Collection<U>): Sequence<[T, U]>
```

`zip` is used to join two `Collection` objects into one. The resulting `Sequence` consists of pairs of values and has the length of the shorter of the two provided.

Example:

```typescript
import { zip, range } from 'iterable-sequence'

const withIndices = zip('abc', range(Infinity)).toArray()
console.log(withIndices) // outputs: [['a', 0], ['b', 1], ['c', 2]]

const withIndicesReversed = range(Infinity)
  .zip('abc')
  .toArray()
console.log(withIndicesReversed) // outputs: [[0, 'a'], [1, 'b'], [2, 'c']]
```


## `map`

```typescript
function map<T, U>(collection: Collection<T>, fn: (value: T, index: number) => U): Sequence<U>
Sequence<T>.map<U>(fn: (value: T, index: number) => U): Sequence<U>
```

`map` creates a `Sequence` which values correspond to the given `Collection` but are transformed by applying the function passed as argument to them.

Example:

```typescript
import { map } from 'iterable-sequence'

const lettersDashNumbers = map('abc', (letter, index) => `${letter}-${index}`)
  .toArray()

console.log(lettersDashNumbers) // outputs: ['a-0', 'b-1', 'c-2']
```


## `flatMap`

```typescript
function flatMap<T, U>(collection: Collection<T>, fn: (value: T, index: number) => Collection<U>): Sequence<U>
Sequence<T>.flatMap<U>(fn: (value: T, index: number) => Collection<U>): Sequence<U>
```

`flatMap` is similar to `map` but it flattens the transformed values into the created sequence.

Example:

```typescript
import { range } from 'iterable-sequence'

const timesThenPlus = new range(3, 6) // 3, 4, 5
  .flatMap((element, index) => [element * index, element + index])
  .toArray()

console.log(timesThenPlus) // outputs: [0, 3, 4, 5, 10, 7]
```


