
import { PortName } from './types/Computer'
import { Param, ParamValue } from './Param'

export const string = (name: string) => new ParamBuilder({name, type: 'string'})
export const number = (name: string) => new ParamBuilder({name, type: 'number'})
export const json = (name: string) => new ParamBuilder({name, type: 'json'})
export const select = (name: string) => new ParamBuilder({name, type: 'select'})
export const text = (name: string) => new ParamBuilder({name, type: 'text'})

export class ParamBuilder {
  name: string
  type: string
  selectOptions?: string[]
  inputSchemaFromPort?: PortName
  defaultRows: number = 1

  constructor(options: {
    name: string,
    type: string,
    rows?: number,
  }) {
    this.name = options.name
    this.type = options.type
    this.defaultRows = options.rows || (
      options.type === 'json' ? 12 : 1
    )
  }

  value(value: ParamValue): ParamBuilder {
    this.value = value

    return this
  }

  schemaFromPort(portName: PortName) {
    this.inputSchemaFromPort = portName

    return this
  }

  options(options: string[]): ParamBuilder {
    this.selectOptions = options

    return this
  }

  rows(rows: number): ParamBuilder {
    this.defaultRows = rows

    return this
  }

  get(): Param {
    return {
      id: this.name,
      name: this.name,
      type: this.type,
      value: this.value,
      rows: this.defaultRows,
      selectOptions: this.selectOptions,
      inputSchemaFromPort: this.inputSchemaFromPort
    }
  }
}