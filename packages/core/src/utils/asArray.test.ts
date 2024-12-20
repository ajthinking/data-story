import { asArray } from './asArray';

it('returns the input if it is an array', () => {
  expect(asArray([1, 2, 3])).toEqual([1, 2, 3]);
})

it('returns an array with the input as the only element if it is not an array', () => {
  expect(asArray(1)).toEqual([1]);
  expect(asArray('hello')).toEqual(['hello']);
  expect(asArray({ a: 1 })).toEqual([{ a: 1 }]);
})