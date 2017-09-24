import Sequence from './Sequence';
declare function range(end: number): Sequence<number>;
declare function range(start: number, end: number): Sequence<number>;
declare function range(start: number, next: number, end: number): Sequence<number>;
export default range;
