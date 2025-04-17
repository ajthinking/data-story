import { mergeLegacy as merge } from './mergeLegacy';

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

it('merges with deep differences', () => {
  const first = { id: 1 }
  const second = {
    id: 2,
    associations: {
      person: {
        name: 'John',
      },
    },
  }

  expect(merge(first, second)).toEqual({
    id: 2,
    associations: {
      person: {
        name: 'John',
      },
    },
  })
})