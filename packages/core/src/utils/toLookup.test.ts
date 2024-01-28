import { toLookup } from './toLookup';

it('returns an empty object when no items are passed', () => {
  const items: any[] = [];
  const keyPath = 'id';
  const valuePath = 'name';
  const result = toLookup(items, keyPath, valuePath);

  expect(result).toEqual({});
});

it('returns an object with flat keys and values from items', () => {
  const items = [
    { id: 'a', uppercase: 'A' },
    { id: 'b', uppercase: 'B' },
    { id: 'c', uppercase: 'C' },
  ];
  const keyPath = 'id';
  const valuePath = 'uppercase';
  const result = toLookup(items, keyPath, valuePath);

  expect(result).toEqual({
    a: 'A',
    b: 'B',
    c: 'C',
  });
});

it('returns an object with nested keys and values from items', () => {
  const items = [
    { id: 'a', nested: { uppercase: 'A' } },
    { id: 'b', nested: { uppercase: 'B' } },
    { id: 'c', nested: { uppercase: 'C' } },
  ];
  const keyPath = 'id';
  const valuePath = 'nested.uppercase';
  const result = toLookup(items, keyPath, valuePath);

  expect(result).toEqual({
    a: 'A',
    b: 'B',
    c: 'C',
  });
});