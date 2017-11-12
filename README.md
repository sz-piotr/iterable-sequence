[![Build Status](https://travis-ci.org/sz-piotr/iterable-sequence.svg?branch=master)](https://travis-ci.org/sz-piotr/iterable-sequence)
[![Coverage Status](https://coveralls.io/repos/github/sz-piotr/iterable-sequence/badge.svg?branch=master&n=0)](https://coveralls.io/github/sz-piotr/iterable-sequence?branch=master)
[![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/iterable-sequence.svg)](https://www.npmjs.com/package/iterable-sequence)

# Iterable Sequence

A utility library for working with iterables in modern JavaScript and TypeScript.

[Installation](#installation) &middot;
[Introduction](#introduction) &middot;
[API](#api)

## Motivation

With the ES2015 specification came the iteration protocol allowing us to write `for..of` loops in JavaScript. However the built in language APIs do not provide some useful features that the use of the protocol enables.

The fundamental difference between working with iterables and working with arrays is that an iterable does not need an underlying data structure. This opens up the possibility for ranges, infinite Collections, data manipulation without copying entire data structures and many more.

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

You can also use the provided script directly in the browser (using the following link is not recommended in production):
```html
<script src="https://rawgit.com/sz-piotr/iterable-sequence/master/lib/iterable-sequence.js"></script>
<script>
  var values = seq.range(5).toArray()
  console.log(values) // outputs: 0, 1, 2, 3, 4
</script>
```

## Introduction

Let's explore some of the basic capabilities of the library. Probably the most important function provided is [`range`](#range).

Here is how you would use the [`range`](#range) function for iteration:
```typescript
import { range } from 'iterable-sequence'

for(const i of range(5)) {
  console.log(i) // outputs: 0, 1, 2, 3, 4
}
```

If you know python this will surely look familiar. What's interesting is that like the newer versions of python the [`range`](#range) function doesn't create an array. Instead it creates an iterable object. This means that you can easily create infinite sequences:

```typescript
import { range } from 'iterable-sequence'

for(const i of range(Infinity)) {
  console.log(i) // outputs: 0, 1, 2, 3, 4, 5, ...
}
```

[`range`](#range) is also versatile. You can specify the starting value and even the difference between consecutive values called `step`.

```typescript
import { range } from 'iterable-sequence'

const from1to5 = range(1, 5) // 1, 2, 3, 4
const withStep = range(1, 7, 2) // 1, 3, 5
```

Imagine however that it didn't have that capabilities. To achive the desired result we could use the [`map`](#map) function:

```typescript
import { range, map } from 'iterable-sequence'

const from1to5 = map(range(4), x => x + 1) // 1, 2, 3, 4
const withStep = map(range(3), x => x * 2 + 1) // 1, 3, 5
```

### Sequences

[`range`](#range), [`map`](#map) and most other functions of the library return a [`Sequence`](#sequence). Objects of this class have methods corresponding to the standalone functions such as [`map`](#map). Let's see this in action:

```typescript
import { range } from 'iterable-sequence'

const from1to5 = range(4).map(x => x + 1) // 1, 2, 3, 4
const withStep = range(3).map(x => x * 2 + 1) // 1, 3, 5
```

The [`Sequence`](#sequence) class is very powerful, because it can be created from many different data structures. You can use an iterable object (e.g. `range(4)`, arrays: `[1, 2, 3]`, strings: `'abc'` and many others), an array-like object (one that has numerical keys and a length property. e.g. `{ 0: 'a', 1: 'b', length: 2 }`) or even a generator function (this is what the library uses internally).

A [`Sequence`](#sequence) object can also be created using the constructor:

```typescript
import { Sequence } from 'iterable-sequence'

const mySequence = new Sequence('abc')
```

What else can you do with a [`Sequence`](#sequence)? How can you actually use the object? The main use case is iteration:

```typescript
import { Sequence } from 'iterable-sequence'

for(const value of new Sequence('abc')) {
  console.log(value) // outputs: 'a', 'b', 'c'
}

new Sequence('abc')
  .forEach(x => console.log(x)) // outputs: 'a', 'b', 'c'
```

You can also convert a [`Sequence`](#sequence) to an Array or even a String. This is done using [`.toArray`](#sequencetoarray) and [`.join`](#sequencejoin):

```typescript
import { Sequence } from 'iterable-sequence'

const array = new Sequence('abc').toArray()
console.log(array) // outputs: ['a', 'b', 'c']

const string = new Sequence('abc').join('-')
console.log(string) // outputs: 'a-b-c'
```

### Manipulation

So far we have only covered [`range`](#range) and [`map`](#map). This is however only a small set of the functions that the library offers. Let's look at some others.

A very useful function is [`zip`](#zip). It can combine two collections[<sup>?</sup>](#collection) into a single sequence. Let's see it in action:

```typescript
import { range } from 'iterable-sequence'

const zipped = range(2, 7)
  .zip(range(6, 1, -1))

// you can use destructuring on the values
for(const [a, b] of zipped) {
  console.log(`first: ${a}, second: ${b}`)
}
/* Output:
first: 2, second: 6
first: 3, second: 5
first: 4, second: 3
first: 5, second: 2
*/
```

Sometimes you like your data so much you want even more of it. This is when [`repeat`](#repeat) and [`repeatValue`](#repeatvalue) shine. Their purpose is what the name suggest. They are used to create sequences with values repeated over and over:

```typescript
import { repeat, repeatValue } from 'iterable-sequence'

for(const value of repeat([1, 2], 3)) {
  console.log(value) // outputs: 1, 2, 1, 2, 1, 2
}

for(const value of repeatValue('a', 3)) {
  console.log(value) // outputs: 'a', 'a', 'a'
}
```

But sometimes you don't like your data that much. You would rather prefer to have less. Fortunately this library supports a family of filtering functions. Let's take a quick look at each of them:

```typescript
import { range } from 'iterable-sequence'

const data = range(3).repeat(2) // 0, 1, 2, 0, 1, 2

const notZero = data.filter(x => x !== 0) // 1, 2, 1, 2
const beforeFirst2 = data.takeWhile(x => x !== 2) // 0, 1
const first2AndAfter = data.dropWhile(x => x !== 2) // 2, 0, 1, 2
```

Here we can see another aspect of the library. No function performs mutation. This is crutial, because we can reuse the [`Sequence`](#sequence) we have already created.

We have covered the most important features of the library. To see the list of all functions and read the detailed docs see the [API](#api) section.

# API

## Index

- [`Collection`](#collection)
- [`Sequence`](#sequence)
- [`Sequence.toArray`](#sequencetoarray)
- [`Sequence.join`](#sequencejoin)
- [`Sequence.forEach`](#sequenceforeach)
- [`range`](#range)
- [`repeat`](#repeat)
- [`repeatValue`](#repeatvalue)
- [`zip`](#zip)
- [`append`](#append)
- [`map`](#map)
- [`flatMap`](#flatmap)
- [`filter`](#filter)
- [`take`](#take)
- [`takeWhile`](#takewhile)
- [`drop`](#drop)
- [`dropWhile`](#dropwhile)
- [`reduce`](#reduce)

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

const sequenceFromArray = new Sequence(['a', 'b', 'c'])
const sequenceFromString = new Sequence('abc')
const sequenceFromArrayLike = new Sequence({ 
  0: 'a', 
  1: 'b', 
  2: 'c',
  length: 3 
})
const sequenceFromGenerator = new Sequence(function* () { 
  yield 'a'
  yield 'b'
  yield 'c' 
})
```


## `Sequence.toArray`

```typescript
function Sequence<T>.toArray(): T[]
```

Return an array with the elements of this Sequence.

Example:
```typescript
import { Sequence } from 'iterable-sequence'

const values = new Sequence('abc').toArray()
console.log(values) // outputs: ['a', 'b', 'c']
```

## `Sequence.join`

```typescript
function Sequence<T>.join(separator?: string): string
```

Return a string formed by concatenating the string representation of the elements of this Sequence.

Arguments:
* **separator**: A string that will be used between the Sequence elements. Defaults to empty string.

Example:
```typescript
import { Sequence } from 'iterable-sequence'

const sequence = new Sequence([1, 2, 3])
console.log(sequence.join()) // outputs: '123'
console.log(sequence.join('-')) // outputs: '1-2-3'
```

## `Sequence.forEach`

```typescript
function Sequence<T>.forEach(fn: (value: T, index: number) => any): void
```

For each element of this Sequence call the supplied function with the value and index of this element.

Arguments:
* **fn**: The function to call with the values and indices of the elements of this Sequence.

Example:
```typescript
import { Sequence } from 'iterable-sequence'

const sequence = new Sequence('xyz')
sequence.forEach(console.log) 
/* outputs:
  'x', 0
  'y', 1
  'z', 2
*/
```

## `range`

```typescript
function range(end: number): Sequence<number>
function range(start: number, end: number): Sequence<number>
function range(start: number, end: number, step: number): Sequence<number>
```

Return a Sequence of integers smaller than the value of the first parameter starting with the value of the second parameter. The value of the third parameter dictates the step.

Arguments:
* **start**: First element of the sequence. Defaults to 0.
* **end**: Upper limit of the sequence.
* **step**: Difference between two consecutive elements of the Sequence. Defaults to 1.

Example:
```typescript
import { range } from 'iterable-sequence'

const oneArgument = range(5) // 0, 1, 2, 3, 4
const twoArguments = range(2, 5) // 2, 3, 4
const threeArguments = range(0, 7, 2) // 0, 2, 4, 6

const descending = range(5, 0, -1) // 5, 4, 3, 2, 1
const infinite = range(Infinity) // 0, 1, 2, 3, ...
```


## `repeat`

```typescript
function repeat<T>(collection: Collection<T>, times?: number): Sequence<T>
function Sequence<T>.repeat(times?: number): Sequence<T>
```

Return a Sequence whose elements are the elements of the passed collection repeated the specified number of times.
 
Arguments: 
* **collection**: A Collection whose elements will be repeated in the resulting Sequence
* **times**: The number of times the elements are repeated. Defaults to Infinity

Example:
```typescript
import { repeat } from 'iterable-sequence'

const tripleABC = repeat('abc', 3).join()
console.log(tripleABC) // outputs: 'abcabcabc'

for(const value of repeat([1, 2])) {
  console.log(value) // outputs: 1, 2, 1, 2, 1, 2, ...
}
```


## `repeatValue`

```typescript
function repeatValue<T>(value: T, times?: number): Sequence<T>
```

Return a Sequence consisting of the supplied value repeated the specified number of times.

Arguments:
* **value**: A value to repeat.
* **times**: The number of times the value is repeated. Defaults to Infinity.

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
function Sequence<T>.zip<U>(collection: Collection<U>): Sequence<[T, U]>
```

Return a Sequence whose elements are two element arrays created from the elements of the collections passed as arguments. The length of the sequence is equal to the length of the shorter collection.

Arguments:
* **a**: A Collection to zip
* **b**: A Collection to zip

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


## `append`

```typescript
function append<T, U>(first: Collection<T>, second: Collection<U>): Sequence<T | U>
function Sequence<T>.append<U>(collection: Collection<U>): Sequence<T | U>
```

Return a Sequence consisting of elements from the first collection followed by the elements from the second
Arguments:
* **first** A Collection to use when forming the resulting sequence.
* **second** A Collection to use when forming the resulting sequence.

Example:
```typescript
import { append, range } from 'iterable-sequence'

const combined = append('abc', range(Infinity))
for(const x of combined) {
  console.log(x) // outputs: 'a', 'b', 'c', 0, 1, 2, 3, ...
}
```


## `map`

```typescript
function map<T, U>(collection: Collection<T>, fn: (value: T, index: number) => U): Sequence<U>
function Sequence<T>.map<U>(fn: (value: T, index: number) => U): Sequence<U>
```

Return a Sequence that contains the elements created from the input collection elements.

Arguments:
* **collection**: A collection to use as input.
* **fn**: A function that produces an element of the new Sequence using an element of the old collection.

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
function Sequence<T>.flatMap<U>(fn: (value: T, index: number) => Collection<U>): Sequence<U>
```

Return a Sequence that contains the elements of flattened collections created from the input collection elements.

Arguments:
* **collection**: A collection to use as input.
* **fn**: A function that produces an element of the new Sequence using an element of the old collection.

Example:
```typescript
import { range } from 'iterable-sequence'

const timesThenPlus = range(3, 6) // 3, 4, 5
  .flatMap((element, index) => [element * index, element + index])
  .toArray()

console.log(timesThenPlus) // outputs: [0, 3, 4, 5, 10, 7]
```

## `filter`

```typescript
function flatMap<T, U>(collection: Collection<T>, fn: (value: T, index: number) => Collection<U>): Sequence<U>
function Sequence<T>.flatMap<U>(fn: (value: T, index: number) => Collection<U>): Sequence<U>
```

Return a Sequence that contains the elements from the input collection that satisfy the predicate.

Arguments:
* **collection**: A collection to filter.
* **predicate**: A function that tests if a value satisfies some condition.

Example:
```typescript
import { range } from 'iterable-sequence'

const noFours = range(6, 2, -1) // 6, 5, 4, 3
  .filter(x => x !== 4)
  .toArray()

console.log(noFours) // outputs: [6, 5, 3]
```

## `take`

```typescript
function take<T>(collection: Collection<T>, count: number): Sequence<T>
function Sequence<T>.take(count: number): Sequence<T>
```

Return a Sequence that contains the first elements of the collection. The argument specifies the number of elements to take. If the length of the collection is smaller, all of the colleciton elements will be present in the resulting sequence.

Arguments:
* **collection**: A collection to use as source of elements.
* **count**: The number of elements to take.

Example:
```typescript
import { take } from 'iterable-sequence'

const firstLetters = take('abcdefghijklmnopqrtuvwxyz', 5).join()
const firstCats = take(['Garfield', 'Puss', 'Smokey'], 6).join(' and ')

console.log(firstLetters) // outputs: 'abcde'
console.log(firstCats) // outputs: 'Garfield and Puss and Smokey'
```

## `takeWhile`

```typescript
function takeWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean): Sequence<T>
function Sequence<T>.takeWhile(predicate: (value: T, index: number) => boolean): Sequence<T>
```

Return a Sequence that contains the elements from the input collection that occur before the element that no longer satisfies the predicate.

Arguments: 
* **collection**: A collection to filter.
* **predicate**: A function that tests if a value satisfies some condition.

Example:
```typescript
import { Sequence } from 'iterable-sequence'

const firstName = new Sequence('John Doe and Jane Doe')
  .takeWhile(char => char !== ' ')
  .join()

console.log(firstName) // outputs: 'John'
```

## `drop`

```typescript
function drop<T>(collection: Collection<T>, count: number): Sequence<T>
function Sequence<T>.drop(count: number): Sequence<T>
```

Return a Sequence that contains the elements of the collection without the first elements. The argument specifies the number of elements to omit.

Arguments:
* **collection**: A collection to use as source of elements.
* **count**: The number of elements to omit.

Example:
```typescript
import { drop } from 'iterable-sequence'

const allButFirst = drop('xyz', 1).join()
console.log(allButFirst) // outputs: 'yz'
```

## `dropWhile`

```typescript
function dropWhile<T>(collection: Collection<T>, predicate: (value: T, index: number) => boolean): Sequence<T>
function Sequence<T>.dropWhile(predicate: (value: T, index: number) => boolean): Sequence<T>
```

Return a Sequence that contains the elements from the input collection that occur after the first element that satisfies the predicate including that element.

Arguments: 
* **collection**: A collection to filter.
* **predicate**: A function that tests if a value satisfies some condition.

Example:
```typescript
import { range } from 'iterable-sequence'

const result = range(4)
  .repeat(2) // 0, 1, 2, 3, 0, 1, 2, 3
  .dropWhile(x => x < 3)
  .toArray()

console.log(result) // outputs: [3, 0, 1, 2, 3]
```


## `reduce`

```typescript
function reduce<T>(collection: Collection<T>, fn: (accumulator: T, value: T, index: number) => T): T
function Sequence<T>.reduce(fn: (accumulator: T, value: T, index: number) => T): T
```

Apply a function against an accumulator and each element of the Collection to reduce it to a single value.

Arguments: 
* **collection** A Collection whose elements will be reduces to a single value.
* **fn** A function that uses an accumulator and an element and reduces them to a single value.

Example:
```typescript
import { range } from 'iterable-sequence'

const multiply = (a, b) => a * b

const factorial = n => 
  range(1, n + 1).reduce(multiply)

console.log(factorial(3)) // outputs: 6
```
