import { describe, expect, it } from 'vitest'
import { ItemWithParams } from './ItemWithParams'
import { Param } from './Param'

describe('value', () => {
  it('can be accessed when no params is supplied', () => {
    const item = new ItemWithParams({ name: 'Bob' }, {})
    expect(item.value).toEqual({ name: 'Bob' })
  })

  it('can be accessed when params is supplied', () => {
    const item = new ItemWithParams(
      { name: 'Bob' },
      { greeting: { value: 'Hello ${name}!' } as Param }
    )

    expect(item.value).toEqual({ name: 'Bob' })
  })
})

describe('params', () => {
  it('can be accessed when interpolated by a item value', () => {
    const item = new ItemWithParams(
      { name: 'Bob' },
      { greeting: 'Hello ${name}!'
    })

    expect(item.params.greeting).toEqual('Hello Bob!')
  })
})