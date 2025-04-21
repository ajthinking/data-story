import { buildNestedObject } from './buildNestedObject';

describe('buildNestedObject', () => {
  it('creates a nested object from a dot-separated path', () => {
    expect(buildNestedObject('a.b.c', 42)).toEqual({ a: { b: { c: 42 } } });
    expect(buildNestedObject('x.y', 'test')).toEqual({ x: { y: 'test' } });
  });

  it('creates a single-level object if path has no dot', () => {
    expect(buildNestedObject('foo', 123)).toEqual({ foo: 123 });
  });

  it('returns the data as-is if path is empty', () => {
    expect(buildNestedObject('', 99)).toEqual(99);
  });

  it('handles non-string data', () => {
    const arr = [1, 2, 3];
    expect(buildNestedObject('arr', arr)).toEqual({ arr });
    const obj = { x: 1 };
    expect(buildNestedObject('deep.value', obj)).toEqual({ deep: { value: obj } });
  });
});
