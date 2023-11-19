import { mapReplace } from "./mapReplace";

it('returns a new object if no mappings are provided', () => {
  const original = { a: 1, b: 2 }
  const map = {}

  expect(mapReplace(original, map)).toMatchObject({})
});

it('returns a new object with the mapped properties', () => {
  const original = { a: 1 }
  const map = { x: 'a' }

  expect(mapReplace(original, map)).toMatchObject({ x: 1 })
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

  const mapped = mapReplace(original, map)

  expect(mapped).toMatchObject({
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

  const mapped = mapReplace(original, map)

  expect(mapped).toMatchObject({
    vendor_id: "some-id",
    properties: {
      name: "John",
      metadata: {
        age: 42
      }
    }
  })
});