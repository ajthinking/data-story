import { Diagram, multiline, nodes } from '.';
import { Application } from './Application';
import { str } from './Param';

export const remoteNodeProvider = {
  boot: async (app: Application) => {
    addFooBarStamper(app);
    addDownloadEntity(app);
  },
};

const addFooBarStamper = (app: Application) => {
  // *************************************
  // Make a nested node
  // *************************************
  const nestedNode = app.getDiagramBuilder()
    .withParams([
      str({
        name: 'stamp',
        value: 'secret message passed',
      },
      ),
    ])
    .add('Input', { port_name: 'input' })
    .add('Map', {
      mapper: multiline`
        item => ({
          ...item,
          global_param_access: '@{stamp}',
        })`,
    })
    .add('Output', { port_name: 'stamped' })
    .connect()
    .get();

  // *************************************
  // Add nested node to app
  // *************************************
  app.addNestedNode('FooBarStamper', nestedNode);
}

const addDownloadEntity = (app: Application) => {
  const entities = [
    'contacts',
    'companies',
    'deals',
    'tickets',
  ]

  const node = {
    'nodes': [
      {
        'id': 'Request.pna2PHQTUi',
        'type': 'Request',
        'label': 'api/<ENTITY>',
        'inputs': [
          {
            'id': 'Request.pna2PHQTUi.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'Request.pna2PHQTUi.items',
            'name': 'items',
            'schema': {},
          },
          {
            'id': 'Request.pna2PHQTUi.response',
            'name': 'response',
            'schema': {},
          },
          {
            'id': 'Request.pna2PHQTUi.error',
            'name': 'error',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'url',
            'type': 'StringableParam',
            'label': 'url',
            'help': '',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
            ],
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'https://api.hubapi.com/crm/v3/objects/@{entity}',
              'Cast': 'stringCast',
            },
          },
          {
            'name': 'method',
            'type': 'StringableParam',
            'label': 'method',
            'help': '',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'GET',
              'Cast': 'stringCast',
            },
          },
          {
            'name': 'body',
            'type': 'StringableParam',
            'label': 'body',
            'help': '',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': '',
              'Evaluation': 'JSON',
            },
          },
          {
            'name': 'config',
            'type': 'StringableParam',
            'label': 'config',
            'help': '',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
                'selected': false,
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
                'selected': false,
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
                'selected': false,
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'item => ({\n  params: {\n    limit: 1,\n    after: item.after\n  },\n  headers: {\n    authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`\n  }\n})',
              'Evaluation': 'JS_FUNCTION',
            },
          },
          {
            'name': 'item_path',
            'type': 'StringableParam',
            'label': 'item_path',
            'help': 'Path to the items in the response data.',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'results',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 818.1019059414579,
          'y': 80.29271533871162,
        },
      },
      {
        'id': 'FilterMap.argFsubyjV',
        'type': 'FilterMap',
        'label': 'Has More?',
        'inputs': [
          {
            'id': 'FilterMap.argFsubyjV.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'FilterMap.argFsubyjV.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'mapper',
            'type': 'StringableParam',
            'label': 'mapper',
            'help': '',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'function(item) {\n  const after = item.response?.data?.paging?.next?.after\n  if(!after) return\n\n  return {\n    ...item,\n    after,\n  }\n}',
              'Evaluation': 'JS_FUNCTION',
            },
          },
        ],
        'position': {
          'x': 1146.0276237080645,
          'y': 221.11534422507668,
        },
      },
      {
        'id': 'If.hFUjWhVeEW',
        'type': 'If',
        'label': 'Retryable?',
        'inputs': [
          {
            'id': 'If.hFUjWhVeEW.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'If.hFUjWhVeEW.true',
            'name': 'true',
            'schema': {},
          },
          {
            'id': 'If.hFUjWhVeEW.false',
            'name': 'false',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'condition',
            'type': 'StringableParam',
            'label': 'condition',
            'help': 'JavaScript function that returns true or false',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'item => item.value > 0\n',
              'Evaluation': 'JS_FUNCTION',
            },
          },
        ],
        'position': {
          'x': 1095.8964721952298,
          'y': 411.50893556453155,
        },
      },
      {
        'id': 'Throw.H1IsndCPgp',
        'type': 'Throw',
        'label': 'Throw',
        'inputs': [
          {
            'id': 'Throw.H1IsndCPgp.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [],
        'params': [
          {
            'name': 'message',
            'type': 'StringableParam',
            'label': 'message',
            'help': 'What to throw',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
            ],
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'Some error',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 1380.4503720215841,
          'y': 571.2414921638916,
        },
      },
      {
        'id': 'Sleep.mnQZr308n5',
        'type': 'Sleep',
        'label': 'Backoff',
        'inputs': [
          {
            'id': 'Sleep.mnQZr308n5.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'Sleep.mnQZr308n5.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'duration',
            'type': 'StringableParam',
            'label': 'Duration',
            'help': 'How many ms to sleep?',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
            ],
            'input': {
              'rawValue': '100',
              'Cast': 'numberCast',
            },
          },
        ],
        'position': {
          'x': 1381.375833488046,
          'y': 433.8721239395465,
        },
      },
      {
        'id': 'If.1PlBkEQCFr',
        'type': 'If',
        'label': 'If',
        'inputs': [
          {
            'id': 'If.1PlBkEQCFr.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'If.1PlBkEQCFr.true',
            'name': 'true',
            'schema': {},
          },
          {
            'id': 'If.1PlBkEQCFr.false',
            'name': 'false',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'condition',
            'type': 'StringableParam',
            'label': 'condition',
            'help': 'JavaScript function that returns true or false',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
                'selected': false,
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
                'selected': false,
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
                'selected': false,
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'Boolean(process.env.HUBSPOT_ACCESS_TOKEN)',
              'Evaluation': 'JS_EXPRESSION',
            },
          },
        ],
        'position': {
          'x': 360.1915660451833,
          'y': 77.46274882038068,
        },
      },
      {
        'id': 'Throw.nR9VUyTK1D',
        'type': 'Throw',
        'label': 'Throw',
        'inputs': [
          {
            'id': 'Throw.nR9VUyTK1D.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [],
        'params': [
          {
            'name': 'message',
            'type': 'StringableParam',
            'label': 'message',
            'help': 'What to throw',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
            ],
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'No value found in env HUBSPOT_ACCESS_TOKEN',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 508.8744726667219,
          'y': 288.59201054858926,
        },
      },
      {
        'id': 'Table.C8PKBUIidF',
        'type': 'Table',
        'label': 'Table',
        'inputs': [
          {
            'id': 'Table.C8PKBUIidF.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [],
        'params': [
          {
            'type': 'StringableParam',
            'name': 'only',
            'label': 'Only',
            'multiline': true,
            'canInterpolate': false,
            'help': 'If set, only the specified paths will be shown. Use comma separation',
            'input': {
              'rawValue': '',
              'Evaluation': 'STRING_LIST',
            },
            'evaluations': [
              {
                'type': 'STRING_LIST',
                'label': 'list',
                'shortLabel': 'list',
              },
            ],
          },
          {
            'type': 'StringableParam',
            'name': 'drop',
            'label': 'Drop',
            'multiline': true,
            'canInterpolate': false,
            'help': 'If set, the specified paths will be dropped. Use comma separation',
            'input': {
              'rawValue': '',
              'Evaluation': 'STRING_LIST',
            },
            'evaluations': [
              {
                'type': 'STRING_LIST',
                'label': 'list',
                'shortLabel': 'list',
              },
            ],
          },
          {
            'name': 'destructObjects',
            'type': 'StringableParam',
            'label': 'destructObjects',
            'help': 'If set, objects will be destructured',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'true',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 1015.737180630588,
          'y': 701.9286474541559,
        },
      },
      {
        'id': 'LoopBack.u9pUFT4ST5',
        'type': 'LoopBack',
        'label': 'Loop Back',
        'inputs': [
          {
            'id': 'LoopBack.u9pUFT4ST5.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'LoopBack.u9pUFT4ST5.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'port_name',
            'type': 'StringableParam',
            'label': 'Port Name',
            'help': 'The name of the loop back port.',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'has-more',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 1389.4467401341556,
          'y': 181.3792763895645,
        },
      },
      {
        'id': 'LoopStart.vZhoJS7GMJ',
        'type': 'LoopStart',
        'label': 'Loop Start',
        'inputs': [
          {
            'id': 'LoopStart.vZhoJS7GMJ.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'LoopStart.vZhoJS7GMJ.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'port_name',
            'type': 'StringableParam',
            'label': 'Port Name',
            'help': 'The name of the loop start port.',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'has-more',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 616.3129593497374,
          'y': 193.70019365796705,
        },
      },
      {
        'id': 'Output.HCAPZODyjm',
        'type': 'Output',
        'label': 'Output',
        'inputs': [
          {
            'id': 'Output.HCAPZODyjm.input',
            'name': 'input',
            'schema': {},
          },
        ],
        'outputs': [
          {
            'id': 'Output.HCAPZODyjm.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'port_name',
            'type': 'StringableParam',
            'label': 'Port Name',
            'help': 'The name of the output port.',
            'multiline': false,
            'canInterpolate': true,
            'interpolate': true,
            'casts': [
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': 'output',
              'Cast': 'stringCast',
            },
          },
        ],
        'position': {
          'x': 1570.434188461761,
          'y': 131.75452126662225,
        },
      },
      {
        'id': 'Create.Uk91QKmAvz',
        'type': 'Create',
        'label': 'Create',
        'inputs': [],
        'outputs': [
          {
            'id': 'Create.Uk91QKmAvz.output',
            'name': 'output',
            'schema': {},
          },
        ],
        'params': [
          {
            'name': 'data',
            'type': 'StringableParam',
            'label': 'data',
            'help': 'You may use json, js function or expression',
            'multiline': true,
            'canInterpolate': true,
            'interpolate': true,
            'evaluations': [
              {
                'type': 'JSON',
                'label': 'JSON',
                'shortLabel': 'json',
              },
              {
                'type': 'JS_FUNCTION',
                'label': 'JS Function',
                'shortLabel': 'fn',
              },
              {
                'type': 'JS_EXPRESSION',
                'label': 'JS Expression',
                'shortLabel': 'expr',
              },
            ],
            'casts': [
              {
                'type': 'numberCast',
                'label': 'Number',
                'shortLabel': 'num',
              },
              {
                'type': 'stringCast',
                'label': 'String',
                'shortLabel': 'str',
              },
            ],
            'input': {
              'rawValue': '{\n  "foo": "bar"\n}',
              'Evaluation': 'JS_EXPRESSION',
            },
          },
        ],
        'position': {
          'x': 112.63551479723716,
          'y': 73.94732191493799,
        },
      },
    ],
    'links': [
      {
        'id': 'icAB0vivGM',
        'sourcePortId': 'If.hFUjWhVeEW.false',
        'targetPortId': 'Throw.H1IsndCPgp.input',
        'label': 0,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'Tjol6dMwAU',
        'sourcePortId': 'If.hFUjWhVeEW.true',
        'targetPortId': 'Sleep.mnQZr308n5.input',
        'label': 0,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'duknE03Tk6',
        'sourcePortId': 'If.1PlBkEQCFr.false',
        'targetPortId': 'Throw.nR9VUyTK1D.input',
        'label': 0,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'Em2xtu1puy',
        'sourcePortId': 'Request.pna2PHQTUi.error',
        'targetPortId': 'Table.C8PKBUIidF.input',
        'label': 0,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'PsgipUjwrH',
        'sourcePortId': 'FilterMap.argFsubyjV.output',
        'targetPortId': 'LoopBack.u9pUFT4ST5.input',
        'label': 2,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': '4y3WDy0Bf3',
        'sourcePortId': 'LoopStart.vZhoJS7GMJ.output',
        'targetPortId': 'Request.pna2PHQTUi.input',
        'label': 2,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'j7sRswF94L',
        'sourcePortId': 'Request.pna2PHQTUi.items',
        'targetPortId': 'Output.HCAPZODyjm.input',
        'label': 3,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'APaebPXD9Q',
        'sourcePortId': 'Request.pna2PHQTUi.error',
        'targetPortId': 'If.hFUjWhVeEW.input',
        'label': 0,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'bz0npYmccO',
        'sourcePortId': 'Create.Uk91QKmAvz.output',
        'targetPortId': 'If.1PlBkEQCFr.input',
        'label': 1,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'jXX7Q4UnLv',
        'sourcePortId': 'If.1PlBkEQCFr.true',
        'targetPortId': 'Request.pna2PHQTUi.input',
        'label': 1,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
      {
        'id': 'grFUTm380a',
        'sourcePortId': 'Request.pna2PHQTUi.response',
        'targetPortId': 'FilterMap.argFsubyjV.input',
        'label': 3,
        'labelBgStyle': {
          'opacity': 0.6,
        },
      },
    ],
    'params': [
      {
        'name': 'entity',
        'type': 'StringableParam',
        'label': 'Entity',
        'help': 'The hubspot entity to fetch',
        'multiline': false,
        'canInterpolate': true,
        'evaluations': [],
        'input': {
          'rawValue': 'contacts',
        },
      },
    ],
    'viewport': {
      'x': 0,
      'y': 0,
      'zoom': 1,
    },
  } as any;

  app.addNestedNode('DownloadEntity', node);

  for(const entity of entities) {
    const computer = structuredClone({
      type: 'DownloadEntity',
      label: entity,
      run: undefined as any,
      params: node.params,
      inputs: node.inputs,
      outputs: node.outputs,
    })

    const [entityParam] = computer.params
    entityParam.input.rawValue = entity

    app.addConfiguredComputerAlias(computer)
  }
}