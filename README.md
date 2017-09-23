# XIterables

A utility library for working with iterables in modern JavaScript and TypeScript.

## Core features

1. *Lazy* - values are computed only when they are actually used
2. *No mutation* - functions and methods don't modify their arguments or internal state of their objects
3. *User friendly API* - methods that you are already familiar with
4. *Types* - the library was compiled with the `--strict` option

## Motivation

With the ES2015 specification came the iteration protocol allowing us to write `for..of` loops in JavaScript. However the built in language APIs do not provide some useful features that the use of the protocol enables.

The fundamental difference between working with iterables and working with arrays is that an iterable does not need an underlying data structure. This opens up the possibility for ranges, infinite sequences, data manipulation without copying entire data structures and many more.

## Use cases

Say you want to know all the even numbers that are not divisible by 3. Here is how you would do it without this library:

```javascript
for(let i = 0; ; i += 2) {
  if(i % 3 !== 0) {
    console.log(i)
  }
}
```

What if you would like to pass that to a function? You would have to somehow store the values you calculated. But this would ultimately limit it to a finite list.

A better aproach would be to use a generator function:

```javascript
function* evenNotDivisibleBy3() {
  for(let i = 0; ; i += 2) {
    if(i % 3 !== 0) {
      yield i
    }
  }
}
```

With it you can easily use the sequence later:

```javascript
for(const value of evenNotDivisibleBy3()) {
  console.log(value)
}
```

Writing generators by hand can be tiresome and the code is not really readable. This is why the library was created. Let's see how to use it in the following example.

```typescript
import { range } from 'xiterables'

const sequence = range(0, 2, Infinity)
  .filter(value => value % 3 !== 0)

for(const value of sequence) {
  console.log(value)
}
```

# API

## Index

1. [Creating iterables](#creating-iterables)
    - [`XIterable`](#xiterable)
    - [`XIterable.constructor`](#xiterableconstructor)
    - [`range`](#range)
    - [`zip`](#zip)
2. [Accessing values](#accessing-values)
    - [`XIterable.collect`](#xiterablecollect)
    - [`XIterable.forEach`](#xiterableforeach)
    - [`XIterable.reduce`](#xiterablereduce)
3. [Transforming values](#transforming-values)
    - [`XIterable.map`](#xiterablemap)
    - [`XIterable.flatMap`](#xiterableflatMap)

## Creating iterables

### `XIterable`

This is the class that the library enables you to use. An `XIterable` object is just like a regular `Iterable`. It can be used in `for..of` loops and has a method `@@iterator`. It doesn't however have a `length` property and the elements of the sequence cannot be accessed by index. 

Most `XIterable` objects do not store their values in any way. They instead rely on the iteration protocol to obtain consequent values.

All `XIterable` methods that return `XIterable` are lazy. That means that they do not perform any computation unless it's necessary. More importantly this means that any function passed to such method is only executed when true iteration occurs.

There are three ways to force the iteration to happen:

1. By using a `for..of` loop or calling `.forEach()`
2. By calling `.collect()`
3. By calling `.reduce()`

### `XIterable.constructor`

This is the primary way of obtaining `XIterable` objects used throughout the library. It accepts any existing `Iterable` or `ArrayLike` (numeric keys, length property) object.

```typescript
import { XIterable } from 'xiterables'

const fromIterable = new XIterable([1, 2, 3]) // 1, 2, 3
const fromArrayLike = new XIterable({ 0: 'a', 1: 'b', length: 2 }) // 'a', 'b'
const empty = new XIterable() // no values
```

### `range`

The `range` function is the basic building block that the library provides. It enables the creation of `XIterable` objects whose values follow a linear progression. There are three ways of creating a range:

```typescript
import { range } from 'xiterables'

// range(end)
const first = range(5) // 0, 1, 2, 3, 4

// range(start, end)
const second = range(2, 5) // 2, 3, 4

// range(start, next, end)
const third = range(1, 3, 7) // 1, 3, 5
```

A range can also be infinite or descending:

```typescript
import { range } from 'xiterables'
 
const infinite = range(Infinity) // 0, 1, 2, ...
const descending = range(5, 4, 0) // 5, 4, 3, 2, 1
```

### `zip`

The `zip` function allows joining two iterables into one `XIterable`. It's best understood by example.

```typescript
import { zip } from 'xiterables'

const zipped = zip([1, 2, 3], ['a', 'b']) // [1, 'a'], [2, 'b']
```

The length of the resulting sequence is equal to the length of the shorter of the sequences.

## Accessing values

### `XIterable.collect`

The method enables acquiring a sequence of values from an `XIterable` as a JavaScript `Array`.

```typescript
import { XIterable } from 'xiterables'

const array = new XIterable([1, 2, 3]).collect() // [1, 2, 3]
```

### `XIterable.forEach`

The method calls the argument with every value of the XIterable's sequence.

```typescript
import { range } from 'xiterables'

range(5).forEach(console.log) // outputs: 0, 1, 2, 3, 4
```

### `XIterable.reduce`

This method reduces the values of the observable to a single value.

```typescript
import { range } from 'xiterables'

const factorial = (value: number) => range(value)
  .reduce((a, b) => a * b)

console.log(factorial(5)) // outputs: 120 
```

## Transforming values


### `XIterable.map`

Returns a new `XIterable` with values transformed by the function passed as argument.

```typescript
import { range } from 'xiterables'

const factorial = (value: number) => range(value)
  .reduce((a, b) => a * b)

console.log(factorial(5)) // outputs: 120 
```

### `XIterable.flatMap`

Returns a new `XIterable` with values transformed by the function passed as argument. The argument function must return an `Iterable` or an `ArrayLike` object. The return value of the function is then flattened into the resulting sequence.

```typescript
import { range } from 'xiterables'

const alternate = range(1, 4)
  .flatMap(value => [value, -value])
  .collect() // [1, -1, 2, -2, 3, -3]
```
