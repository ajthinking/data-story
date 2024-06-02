export const removePropertyData = {
  'name': 'remove_properties',
  'type': 'RepeatableParam',
  'row': [
    {
      'name': 'property',
      'type': 'StringableParam',
      'value': 'id'
    }
  ],
  'value': [
    {
      'property': {
        value: 'foo-1',
      }
    }
  ]
};
export const mockRepeatableData = {
  name: 'repeatableTest',
  type: 'RepeatableParam',
  row: [
    {
      name: 'value',
      type: 'StringableParam',
      value: 'id'
    },
    {
      ...removePropertyData
    }
  ],
  value: [
    {
      value: {
        value: 'value-11'
      },
      remove_properties: [
        {
          'property': {
            value: 'property-11'
          }
        }
      ]
    },
    {
      value: {
        value: 'value-22'
      },
      remove_properties: [
        {
          'property': {
            value: 'property-22'
          }
        }
      ]
    }
  ]
}

export const mockPortMapData = {
  'name': 'port_map',
  'type': 'RepeatableParam',
  'row': [
    {
      'name': 'value',
      'type': 'StringableParam',
      'value': 'id'
    },
    {
      'name': 'port',
      'type': 'PortSelectionParam',
      'value': '',
    }
  ],
  'value': [
    {
      'value': {
        value: '22',
        'Cast': 'numberCast'
      },
      'port': 'unfiltered'
    },
    {
      'value': {
        value: 'id',
        'Cast': 'stringCast'
      },
      'port': 'outputzdbj'
    }
  ]
};
