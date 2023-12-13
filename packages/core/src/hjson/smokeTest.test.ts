import Hjson from './hjson'

describe('parse', () => {
  it('can parse regular json', () => {
    const source = {
      id: 1,
      properties: {
        name: 'Bob'
      }
    }

    const json = JSON.stringify(source, null, 2)

    expect(Hjson.parse(json)).toMatchObject(source)
  })

  it('can parse human json', () => {

    const humanJson = `{
      id: 1
      properties: {
        name: "Bob",
      }
    }`;

    expect(Hjson.parse(humanJson)).toMatchObject({
      id: 1,
      properties: {
        name: 'Bob'
      }
    })
  })
})