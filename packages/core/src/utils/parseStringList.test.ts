import { parseStringList } from './parseStringList';

it('can parse a comma separated list', () => {
  const list = 'a, b, c';
  const result = parseStringList(list);
  expect(result).toEqual(['a', 'b', 'c']);
});

it('can parse a newline separated list', () => {
  const list = `
    a
    b
    c
  `;
  const result = parseStringList(list);
  expect(result).toEqual(['a', 'b', 'c']);
});

it('can parse a mixed list', () => {
  const list = `
    a, b, c
    d, e
  `;
  const result = parseStringList(list);
  expect(result).toEqual(['a', 'b', 'c', 'd', 'e']);
});

it('can parse an empty list', () => {
  const list = '';
  const result = parseStringList(list);
  expect(result).toEqual([]);
});