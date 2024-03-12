import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { Param, RepeatableParam } from '@data-story/core';

const mockRepeatableRow = [
  {
    'name': 'value',
    'type': 'StringableParam',
    'label': 'value',
    'help': '',
    'multiline': false,
    'canInterpolate': true,
    'interpolate': true,
    'casts': [
      {
        'type': 'stringCast',
        'label': 'String',
        'selected': true
      }
    ],
    'value': 'id'
  },
  {
    'name': 'port',
    'label': 'Port',
    'help': 'The port to map to',
    'type': 'PortSelectionParam',
    'value': '',
    'allowCreate': true
  }
];
const mockRepeatableValue = [
  {
    'id': 'wrihes',
    'value': 'id444',
    'port': 'unfiltered'
  },
  {
    'id': '3f4tzr',
    'value': 'id333',
    'port': 'output4ex3'
  },
];
export const mockParam = {
  'name': 'port_map',
  'label': 'Port Map',
  'help': 'Where to map items',
  'type': 'RepeatableParam',
  'row': mockRepeatableRow,
  'value': mockRepeatableValue,
} as unknown as RepeatableParam<Param[]>;
export const mockNode = {
  'width': 128,
  'height': 176,
  'id': 'Filter.2',
  'data1': {
    'params': [
      {
        'name': 'property',
        'type': 'StringableParam',
        'label': 'property',
        'help': '',
        'multiline': false,
        'canInterpolate': true,
        'interpolate': true,
        'casts': [
          {
            'type': 'stringCast',
            'label': 'String',
            'selected': true
          }
        ],
        'value': 'id'
      },
      {
        'name': 'port_map',
        'label': 'Port Map',
        'help': 'Where to map items',
        'type': 'RepeatableParam',
        'row': mockRepeatableRow,
        'value': mockRepeatableValue
      }
    ],
    'computer': 'Filter',
    'label': 'Filter',
    'inputs': [
      {
        'id': 'Filter.2.input',
        'name': 'input',
        'schema': {}
      }
    ],
    'outputs': [
      {
        'id': 'Filter.2.unfiltered',
        'name': 'unfiltered',
        'schema': {}
      },
      {
        'id': 'Filter.2.output4ex3',
        'name': 'output4ex3',
        'schema': {}
      }
    ]
  },
  'type': 'dataStoryNodeComponent',
} as unknown as ReactFlowNode;
export const defaultValues = {
  label: 'Filter',
  params: {
    'property': 'id',
    'port_map': mockRepeatableValue
  }
}
