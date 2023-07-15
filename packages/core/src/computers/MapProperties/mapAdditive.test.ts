import { mapAdditive } from "./mapAdditive";

it('returns the original object if no mappings are provided', () => {
  const original = { a: 1, b: 2 }
  const map = {}

  expect(mapAdditive(original, map)).toMatchObject(original)
});

it('returns a new object with the mapped properties', () => {
  const original = { a: 1 }
  const map = { x: 'a' }

  expect(mapAdditive(original, map)).toMatchObject({ a: 1, x: 1 })
});

it('returns a new object when the mapped property is an object', () => {
  const original = {
    a: {
      b: 1
    }
  }

  const map = {
    x: 'a',
    y: 'a.b'
  }

  const mapped = mapAdditive(original, map)

  expect(mapped).toMatchObject({
    a: {
      b: 1
    },
    x: {
      b: 1
    },
    y: 1
  })
});

it('can do this', () => {
  const original = {
    id: "some-id",
    person: {
      firstname: "John",
      age: 42
    }
  }
  

  const map = {
    vendor_id: "id",
    properties: {
      name: "person.firstname",
      metadata: {
        age: "person.age"
      }
    }
  }

  const mapped = mapAdditive(original, map)

  expect(mapped).toMatchObject({
    id: "some-id",
    vendor_id: "some-id",
    person: {
      firstname: "John",
      age: 42
    },
    properties: {
      name: "John",
      metadata: {
        age: 42
      }
    }
  })
});