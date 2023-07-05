import { get } from './get'

it('can return a value from a string', () => {
  const value = 'hey'

  expect(get(value)).toBe(value)
  expect(get(value, '')).toBe(value)
  expect(get(value, 'nonExistingKey')).toBe(undefined)
})

it('can return a value from a number', () => {
  const value = 1337

  expect(get(value)).toBe(value)
  expect(get(value, '')).toBe(value)
  expect(get(value, 'bad')).toBe(undefined)
})

it('can return a value from a bool', () => {
  const value = true

  expect(get(value)).toBe(value)
  expect(get(value, '')).toBe(value)
  expect(get(value, 'bad')).toBe(undefined)
})

it('can return a value from an object', () => {
  const object = {
    a: 1,
    b: '2',
    c: true,
  }

  expect(get(object)).toBe(object)
  expect(get(object, '')).toBe(object)
  expect(get(object, 'a')).toBe(object.a)
  expect(get(object, 'b')).toBe(object.b)
  expect(get(object, 'c')).toBe(object.c)
  expect(get(object, 'bad')).toBe(undefined)
})

it('can return nested values from an object', () => {
  const object = {
    a: {
      b: {
        c: 1,
      },
    },
  }

  expect(get(object, 'a.b.c')).toBe(object.a.b.c)
})

it('returns undefined if nested key does not exist', () => {
  const object = {
    a: {
      b: {
        c: 1,
      },
    },
  }

  expect(get(object, 'bad.b.d')).toBe(undefined)
  expect(get(object, 'a.bad.d')).toBe(undefined)
  expect(get(object, 'a.b.bad')).toBe(undefined)
})