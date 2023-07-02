import { describe, expect, it } from 'vitest'
import { DefaultParams } from './Param'

describe('name', () => {
  it('should have name and label', () => {
    expect(DefaultParams.name).toMatchObject({
      id: 'name',
      name: 'name',
      type: 'string',
      value: '',
    })
  })
})

describe('label', () => {
  it('should have name and label', () => {
    expect(DefaultParams.label).toMatchObject({
      id: 'label',
      name: 'label',
      type: 'string',
      value: '',
    })
  })
})

describe('DefaultParams', () => {
  it('should have name and label', () => {
    expect(DefaultParams).toMatchObject({
      name: {
        id: 'name',
        name: 'name',
        type: 'string',
        value: '',
      },

      label: {
        id: 'label',
        name: 'label',
        type: 'string',
        value: '',
      },
    })
  })
})