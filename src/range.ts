import Sequence from './Sequence'

/**
 * Return a Sequence of consecutive integers smaller than the value of the first parameter starting with 0
 * @param end Upper limit of the sequence
 */
function range(end: number): Sequence<number>
/**
 * Return a Sequence of consecutive integers smaller than the value of the first parameter starting with the value
 * of the second parameter
 * @param start First element of the sequence
 * @param end Upper limit of the sequence
 */
function range(start: number, end: number): Sequence<number>
/**
 * Return a Sequence of integers smaller than the value of the first parameter starting with the value
 * of the second parameter. The value of the third parameter dictates the step.
 * @param start First element of the sequence
 * @param end Upper limit of the sequence
 * @param step Difference between two consecutive elements of the Sequence
 */
function range(start: number, end: number, step: number): Sequence<number>
function range(a: number, b?: number, c?: number) {
  let start = 0
  let end: number
  let step = 1
  if(b !== undefined) {
    if(c !== undefined) {
      start = a
      end = b
      step = c
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
