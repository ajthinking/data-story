import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory, type ReportLinkItems } from '@data-story/ui';
import { ServerRequest } from '../../const';

const diagram = {
  'viewport': {
    'x': 0,
    'y': 0,
    'zoom': 1
  },
  'nodes': [
    {
      'id': 'Signal.warjoEWLRg',
      'type': 'Signal',
      'docs': '### Description\nCreates an item every X ms, Y times. Useful for testing.\nThe output will look like `{ id: 1 }, { id: 2 }` etc.\n',
      'label': 'Signal',
      'inputs': [],
      'outputs': [
        {
          'id': 'Signal.warjoEWLRg.output',
          'name': 'output',
          'schema': {
            'id': 'any'
          }
        }
      ],
      'params': [
        {
          'name': 'period',
          'type': 'StringableParam',
          'label': 'period',
          'help': 'How many ms between each signal?',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'casts': [
            {
              'type': 'numberCast',
              'label': 'Number',
              'selected': true
            }
          ],
          'value': '5'
        },
        {
          'name': 'count',
          'type': 'StringableParam',
          'label': 'count',
          'help': 'How many times to send the signal?',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'casts': [
            {
              'type': 'numberCast',
              'label': 'Number',
              'selected': true
            }
          ],
          'value': '30'
        },
        {
          'name': 'expression',
          'type': 'StringableParam',
          'label': 'Template expression',
          'help': 'Use this field to customize the signal. ${i} is available as a variable.',
          'multiline': true,
          'canInterpolate': true,
          'interpolate': true,
          'evaluations': [
            {
              'type': 'HJSON',
              'label': 'HJSON',
              'selected': true
            },
            {
              'type': 'JSON',
              'label': 'JSON'
            }
          ],
          'casts': [
            {
              'type': 'numberCast',
              'label': 'Number'
            },
            {
              'type': 'stringCast',
              'label': 'String'
            }
          ],
          'value': '{\n  id: ${i}\n}'
        }
      ],
      'position': {
        'x': 210.85429821148946,
        'y': -1123.5034879822347
      }
    },
    {
      'id': 'Table.7vMJu0muge',
      'type': 'Table',
      'label': 'Table',
      'inputs': [
        {
          'id': 'Table.7vMJu0muge.input',
          'name': 'input',
          'schema': {
            'id': 'any'
          }
        }
      ],
      'outputs': [],
      'params': [],
      'position': {
        'x': 410.85429821148944,
        'y': -1123.5034879822347
      }
    }
  ],
  'links': [
    {
      'id': 'T0zAktdyBb',
      'sourcePortId': 'Signal.warjoEWLRg.output',
      'targetPortId': 'Table.7vMJu0muge.input'
    }
  ],
  'params': [],
  'localNodeDefinitions': {},
  'onConnect': [
    null
  ]
} as unknown as Diagram;

export default ({ mode, reportLinkItems }:
{
  mode?: 'js' | 'node',
  reportLinkItems?: ReportLinkItems
}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        initDiagram={diagram }
        reportLinkItems={reportLinkItems}
        server={mode === 'node'
          ? { type: 'SOCKET', url: ServerRequest }
          : { type: 'JS', app }}
      />
    </div>
  );
};
