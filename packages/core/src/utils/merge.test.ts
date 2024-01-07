import { merge } from './merge';

it('merges flat objects', () => {
  const first = { a: 1 };
  const second = { a: 2, b: 3 };

  expect(merge(first, second)).toEqual({ a: 2, b: 3 });
});

it('merges nested objects', () => {
  const first = { a: { b: 1, c: 2 } };
  const second = { a: { b: 'new' } };

  expect(merge(first, second)).toEqual({ a: { b: 'new', c: 2 } });
});