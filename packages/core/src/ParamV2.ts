// Can we use something like this to enforce certain fields in all param types? 
export interface AbstractParam {
  name: string,
  label: string,
  help: string
}

export type Select = {
  type: 'Select',
  name: string,
  label: string,
  value: string,
  options: string[],
  help: string,
}

export type Repeatable<RepeatableRow> = {
  type: 'Repeatable',
  row: RepeatableRow,
  name: string,
  label: string,
  value: RepeatableRow[],
  help: string,
}

export type DynamicInputType = {
  type: 'DynamicInputType',
  selectedType: string,
  availableTypes: string[],
  name: string,
  label: string,
  value: string,
  help: string,
}

const params: ParamV2[] = JSON.parse('')

export type ParamV2 = Select  | Repeatable<ParamV2[]>

const example_repeatable_row = [
  {
    type: 'String_',
    name: 'host',
    label: 'Host',
    value: 'localhost',
    help: 'A simple fixed type input',
  }, 
] as const

const example_repeatable: Repeatable<typeof example_repeatable_row> = {
  type: 'Repeatable',
  row: example_repeatable_row,
  name: 'host_mapping',
  label: 'Host Mapping',
  help: 'Add host server port mappings',
  value: [
    // row 1
    [
      {
        type: 'String_',
        name: 'host',
        label: 'Host',
        value: 'localhost',
        help: 'A simple fixed type input',    
      },
    ],
  ],
}


export const FIXED_STRING_PARAM = {
  type: 'string',
  name: 'host',
  value: 'localhost',
  help: 'A simple fixed type input',
  label: 'Host',
}

const MULTIPLE_INTERPRETABLE_PARAM = {
  type: 'string',
  availableTypes: ['string', 'number'],
  name: 'server_port',
  value: 8080,
  help: 'A port number',
  label: 'Server Port',
}

const PROPERTY_SELECTION_PARAM = {
  type: 'PROPERTY_SELECTION_SINGLE',
  availableTypes: ['string'],
  inputSchemaFromPort: 'requestor'
}

const REPEATABLE = {
  type: 'REPEATABLE',
  availableTypes: ['string'],
  inputSchemaFromPort: 'requestor'
}