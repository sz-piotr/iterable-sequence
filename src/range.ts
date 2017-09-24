import Sequence from './Sequence'

function range(end: number): Sequence<number>
function range(start: number, end: number): Sequence<number>
function range(start: number, next: number, end: number): Sequence<number>
function range(a: number, b?: number, c?: number) {
  let start = 0
  let step = 1
  let end: number
  if(b !== undefined) {
    if(c !== undefined) {
      start = a
      step = b - a
      end = c
    } else {
      start = a
      end = b
    }
  } else {
    end = a
  }

  if(step > 0) {
    return new Sequence(function* () {
      for(let i = start; i < end; i += step) {
        yield i
      }
    })
  } else {
    return new Sequence(function* () {
      for(let i = start; i > end; i += step) {
        yield i
      }
    })
  }
}

export default range
