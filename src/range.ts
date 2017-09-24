import XIterable from './XIterable'

function range(end: number): XIterable<number>
function range(start: number, end: number): XIterable<number>
function range(start: number, next: number, end: number): XIterable<number>
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
    return new XIterable(function* () {
      for(let i = start; i < end; i += step) {
        yield i
      }
    })
  } else {
    return new XIterable(function* () {
      for(let i = start; i > end; i += step) {
        yield i
      }
    })
  }
}

export default range
