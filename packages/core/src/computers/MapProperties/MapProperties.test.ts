import { when } from '../../support/computerTester/ComputerTester';
import { MapProperties } from './MapProperties';


describe('when mode is ADD', () => {
  it('maps incoming items according to the schema passed', async () => {
    const incoming = [
      {
        id: "some-id",
        person: {
          firstname: "John",
          age: 42
        }
      }
    ]
  
    const map = JSON.stringify({
      vendor_id: "id",
      properties: {
        name: "person.firstname",
        metadata: {
          age: "person.age"
        }
      }
    })
  
  
  
    await when(MapProperties)
      .hasParams({ map })
      .getsInput(incoming)
      .doRun()
      .expectOutput([{
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
      }])
      .ok()
  })
})

describe('when mode is REPLACE', () => {
  it('maps incoming items according to the schema passed', async () => {
    const incoming = [
      {
        id: "some-id",
        person: {
          firstname: "John",
          age: 42
        }
      }
    ]
  
    const map = JSON.stringify({
      vendor_id: "id",
      properties: {
        name: "person.firstname",
        metadata: {
          age: "person.age"
        }
      }
    })
  
  
  
    await when(MapProperties)
      .hasParams({ map })
      .getsInput(incoming)
      .doRun()
      .expectOutput([{
        vendor_id: "some-id",
        properties: {
          name: "John",
          metadata: {
            age: 42
          }
        }
      }])
      .ok()
  })  
})