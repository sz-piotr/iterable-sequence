# XIterables

A utility library for working with iterables in modern JavaScript and TypeScript.

## Core features

1. *Lazy* - values are computed only when they are actually used
2. *No mutation* - every operation creates new iterables
3. *User friendly API* - methods that you are already familiar with

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

## API

### `xiter`

The `xiter` function is a wrapper utility for obtaining `XIterable` objects used throughout the library. It accepts any existing `Iterable` or `ArrayLike` (numeric keys, length property) object.

```typescript
import { xiter } from 'xiterables'

// xiter: <T> (iterable: Iterable<T> | ArrayLike<T>) => XIterable<T>
const wrapped = xiter([1, 2, 3])
```

### `range`

The `range` function is the basic building block that the library provides. It enables the creation of iterables whose values follow a linear progression. There are three ways of creating a range:

```typescript
import { range } from 'xiterables'

// range: (end: number) => XIterable<number> 
const first = range(5) // 0, 1, 2, 3, 4

// range: (start: number, end: number) => XIterable<number> 
const second = range(2, 5) // 2, 3, 4

// range: (start: number, next: number, end: number) => XIterable<number> 
const third = range(0, 2, 5) // 0, 2, 4
```

A range can also be infinite or descending:

```typescript
import { range } from 'xiterables'
 
const infinite = range(Infinity) // 0, 1, 2, ...
const descending = range(5, 4, 0) // 5, 4, 3, 2, 1
```

### `zip`

The `zip` function allows joining two iterables into one. It's best understood by example.

```typescript
import { zip } from 'xiterables'

// zip: <T, U> (a: Iterable<T> | ArrayLike<T>, b: Iterable<U> | ArrayLike<U>) => XIterable<[T, U]>
const zipped = zip([1, 2, 3], ['a', 'b']) // [1, 'a'], [2, 'b']
```

The length of the resulting sequence is equal to the length of the shorter of the sequences.
