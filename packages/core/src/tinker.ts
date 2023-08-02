import { mapAdditive } from "./computers/MapProperties/mapAdditive";

export {}

(async () => {
  const original = {
    id: "some-id",
    person: {
      firstname: "John",
      age: 42
    }
  }
  

  const map = {
    vendor_id: "id",
    // properties: {}
    properties: {
      name: "person.firstname",
      metadata: {
        age: "person.age"
      }
    }
  }

  const mapped = mapAdditive(original, map)
  // const mapped = mapAdditive({}, {})

  console.log(
    mapped
  )
})();