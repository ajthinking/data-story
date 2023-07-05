export type ParamValue = any

export type Param = {
  id: string
  name: string
  rows: number
  type: string
  value?: ParamValue
  placeholder?: string,
  selectOptions?: string[],
  inputSchemaFromPort?: string,
}

export const name: Param = {
  id: 'name',
  name: 'name',
  type: 'string',
  value: '',
  rows: 1,
}

export const label: Param = {
  id: 'label',
  name: 'label',
  type: 'string',
  value: '',
  rows: 1,  
}

export const DefaultParams = { name, label }