import { flattenObjectOneLevel } from './flattenObjectOneLevel'

it('removes first layer of keys', () => {
  const input = {
    a: {
      a1: 1,
    },
    b: {
      b1: 2,
    }
  }

  const output = flattenObjectOneLevel(input)

  expect(output).toEqual({
    a1: 1,
    b1: 2,
  })
})

it('works on empty object', () => {
  const input = {}

  const output = flattenObjectOneLevel(input)

  expect(output).toEqual({})
})