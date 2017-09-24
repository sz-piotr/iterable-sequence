import {
  XIterable,
  collect,
  range,
  repeat,
  zip,
} from './index'

test('the library exports correct values', () => {
  expect(XIterable).toBeTruthy()
  expect(collect).toBeTruthy()
  expect(range).toBeTruthy()
  expect(zip).toBeTruthy()
  expect(repeat).toBeTruthy()
})
