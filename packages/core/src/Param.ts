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