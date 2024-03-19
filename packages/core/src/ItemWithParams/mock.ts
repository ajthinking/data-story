
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
      'id': '-1v8rxp',
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
      id: 'tclcp',
      value: '22',
      port: 'unfiltered'
    },
    {
      id: 't0p45',
      value: 'id',
      port: 'outputzdbj'
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
      'id': 'tclcp',
      'value': '22',
      'port': 'unfiltered'
    },
    {
      'id': 't0p45',
      'value': 'id',
      'port': 'outputzdbj'
    }
  ]
};
