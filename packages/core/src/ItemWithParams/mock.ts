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
      'property': 'foo-1'
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
      value: 'value-11',
      remove_properties: [
        {
          'property': 'property-11'
        }
      ]
    },
    {
      value: 'value-22',
      remove_properties: [
        {
          'property': 'property-22'
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
      'value': '22',
      'port': 'unfiltered'
    },
    {
      'value': 'id',
      'port': 'outputzdbj'
    }
  ]
};
