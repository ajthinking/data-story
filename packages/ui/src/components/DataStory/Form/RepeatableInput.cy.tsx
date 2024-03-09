// mock PortSelectionParam and StringableParam component in RepeatableInput.tsx
import { DataStoryProvider } from '../store/store';
// import { RunModal } from '../modals/runModal';
import React from 'react';
// import { NodeSettingsModal } from '../modals/nodeSettingsModal/nodeSettingsModal';
import { ReactFlowProvider } from 'reactflow';
import { RepeatableInput } from './RepeatableInput';
import { useForm } from 'react-hook-form';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { Param, RepeatableParam } from '@data-story/core';
import { RepeatableInputProps } from '../types';

const mockParam = {
  'name': 'port_map',
  'label': 'Port Map',
  'help': 'Where to map items',
  'type': 'RepeatableParam',
  'row': [
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
  ],
  'value': [
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
  ]
} as unknown as RepeatableParam<Param[]>;
const mockNode = {
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
        'row': [
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
        ],
        'value': [
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
          {
            'id': 'gnt6w3',
            'value': 'id222',
            'port': 'outputyfy8'
          },
          {
            'id': '2klxo',
            'value': 'id',
            'port': 'unfiltered'
          }
        ]
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
      },
      {
        'id': 'Filter.2.outputyfy8',
        'name': 'outputyfy8',
        'schema': {}
      },
      {
        'id': 'Filter.2.outputbx59',
        'name': 'outputbx59',
        'schema': {}
      },
      {
        'id': 'Filter.2.outputy08v',
        'name': 'outputy08v',
        'schema': {}
      }
    ]
  },
  'type': 'dataStoryNodeComponent',
} as unknown as ReactFlowNode;

const RepeatableInputWithForm = () => {
  const mockForm = useForm({
    defaultValues: {
      label: 'Filter',
      params: {
        'property': 'id',
        'port_map': [
          {
            'id': 'wrihes',
            'value': 'id444',
            'port': 'unfiltered'
          },
          {
            'id': '3f4tzr',
            'value': 'id333',
            'port': 'output4ex3'
          }
        ]
      }
    }
  }) as unknown as RepeatableInputProps['form'];

  return (<DataStoryProvider>
    <ReactFlowProvider>
      <RepeatableInput form={mockForm} node={mockNode} param={mockParam} />
    </ReactFlowProvider>
  </DataStoryProvider>)
}

function mountRepeatableInput() {
  cy.mount(<RepeatableInputWithForm />);
}

describe('<RepeatableInput />', () => {
  it('renders', () => {

    mountRepeatableInput();
    cy.dataCy('data-story-repeatable-input').should('exist');
  });
})
