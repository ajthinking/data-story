export const removePropertyData = {
  'name': 'remove_properties',
  'type': 'RepeatableParam',
  'row': [
    {
      'name': 'property',
      'type': 'StringableParam',
      'input': 'id',
    },
  ],
  'input': [
    {
      'property': {
        rawValue: 'foo-1',
      },
    },
  ],
};
export const mockRepeatableData = {
  name: 'repeatableTest',
  type: 'RepeatableParam',
  row: [
    {
      name: 'value',
      type: 'StringableParam',
      input: 'id',
    },
    {
      ...removePropertyData,
    },
  ],
  value: [
    {
      input: {
        input: 'value-11',
      },
      remove_properties: [
        {
          'property': {
            input: 'property-11',
          },
        },
      ],
    },
    {
      input: {
        input: 'value-22',
      },
      remove_properties: [
        {
          'property': {
            input: 'property-22',
          },
        },
      ],
    },
  ],
}

export const mockPortMapData = {
  'name': 'port_map',
  'type': 'RepeatableParam',
  'row': [
    {
      'name': 'value',
      'type': 'StringableParam',
      'input': 'id',
    },
    {
      'name': 'port',
      'type': 'PortSelectionParam',
      'input': '',
    },
  ],
  'input': [
    {
      'value': {
        'rawValue': '22',
        'Cast': 'numberCast',
      },
      'port': 'unfiltered',
    },
    {
      'value': {
        'rawValue': 'id',
        'Cast': 'stringCast',
      },
      'port': 'outputzdbj',
    },
    {
      'value': {
        'rawValue': '222',
        'Cast': 'stringCast',
      },
      'port': 'outputzdbj',
    },
  ],
};
