import Sequence from './Sequence';
/**
 * Return a Sequence of consecutive integers smaller than the value of the first parameter starting with 0
 * @param end Upper limit of the sequence
 */
declare function range(end: number): Sequence<number>;
/**
 * Return a Sequence of consecutive integers smaller than the value of the first parameter starting with the value
 * of the second parameter
 * @param start First element of the sequence
 * @param end Upper limit of the sequence
 */
declare function range(start: number, end: number): Sequence<number>;
/**
 * Return a Sequence of integers smaller than the value of the first parameter starting with the value
 * of the second parameter. The value of the third parameter dictates the step.
 * @param start First element of the sequence
 * @param end Upper limit of the sequence
 * @param step Difference between two consecutive elements of the Sequence
 */
declare function range(start: number, end: number, step: number): Sequence<number>;
export default range;
