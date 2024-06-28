import { describe, expect } from 'vitest';
import { convertElementsWithLinks, convertNodesToElements, convertParams } from './convertJSONToDiagram';
import { DiagramBuilder } from '../DiagramBuilder';
import { ConsoleLog, Signal, Sleep } from '../computers';

export interface JSONLink {
  id: string;
  sourcePortId: string;
  targetPortId: string;
}

export const diagramJson = {
  'type': 'save', 'version': '0.0.84', 'name': 'data-story-diagram', 'diagram': {
    'viewport': { 'x': 0, 'y': 0, 'zoom': 1 },
    'nodes': [
      {
        'id': 'Signal.KsNZw9NetO',
        'type': 'Signal',
        'docs': '### Description\nCreates an item every X ms, Y times. Useful for testing.\nThe output will look like `{ id: 1 }, { id: 2 }` etc.\n',
        'label': 'Signal',
        'inputs': [],
        'outputs': [{ 'id': 'Signal.KsNZw9NetO.output', 'name': 'output', 'schema': { 'id': 'any' } }],
        'params': [{
          'name': 'period',
          'type': 'StringableParam',
          'label': 'period',
          'help': 'How many ms between each signal?',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'casts': [{ 'type': 'numberCast', 'label': 'Number' }],
          'value': { 'value': 50, 'Cast': 'numberCast' }
        }, {
          'name': 'count',
          'type': 'StringableParam',
          'label': 'count',
          'help': 'How many times to send the signal?',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'casts': [{ 'type': 'numberCast', 'label': 'Number' }],
          'value': { 'value': '10', 'Cast': 'numberCast' }
        }, {
          'name': 'expression',
          'type': 'StringableParam',
          'label': 'Template expression',
          'help': 'Use this field to customize the signal. ${i} is available as a variable.',
          'multiline': true,
          'canInterpolate': true,
          'interpolate': true,
          'evaluations': [{ 'type': 'HJSON', 'label': 'HJSON', 'selected': true }, {
            'type': 'JSON',
            'label': 'JSON'
          }, { 'type': 'JS_FUNCTION', 'label': 'JS Function' }, { 'type': 'JS_EXPRESSION', 'label': 'JS Expression' }],
          'casts': [{ 'type': 'numberCast', 'label': 'Number' }, { 'type': 'stringCast', 'label': 'String' }],
          'value': { 'value': '{\n  id: ${i}\n}', 'Evaluation': 'HJSON' }
        }],
        'position': { 'x': -20.661174380157107, 'y': 35.091765031663826 }
      },
      {
        'id': 'Sleep.zmZCqheRDy',
        'type': 'Sleep',
        'label': 'Sleep',
        'inputs': [{ 'id': 'Sleep.zmZCqheRDy.input', 'name': 'input', 'schema': { 'id': 'any' } }],
        'outputs': [{ 'id': 'Sleep.zmZCqheRDy.output', 'name': 'output', 'schema': {} }],
        'params': [{
          'name': 'duration',
          'type': 'StringableParam',
          'label': 'Duration',
          'help': 'How many ms to sleep?',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'casts': [{ 'type': 'numberCast', 'label': 'Number', 'selected': true }],
          'value': { 'value': '100' }
        }],
        'position': { 'x': 179.3388256198429, 'y': 35.091765031663826 }
      },
      {
        'id': 'ConsoleLog.BNgZOoqIwZ',
        'type': 'ConsoleLog',
        'label': 'Console.log',
        'inputs': [{ 'id': 'ConsoleLog.BNgZOoqIwZ.input', 'name': 'input', 'schema': {} }],
        'outputs': [],
        'params': [{
          'name': 'message',
          'type': 'StringableParam',
          'label': 'message',
          'help': 'What to log. Leave blank to log the whole item.',
          'multiline': false,
          'canInterpolate': true,
          'interpolate': true,
          'evaluations': [{ 'type': 'JS_FUNCTION', 'label': 'JS Function' }, {
            'type': 'JSON',
            'label': 'JSON'
          }, { 'type': 'HJSON', 'label': 'HJSON' }],
          'casts': [{ 'type': 'numberCast', 'label': 'Number' }, { 'type': 'stringCast', 'label': 'String' }],
          'value': { 'value': '' }
        }],
        'position': { 'x': 379.3388256198429, 'y': 35.091765031663826 }
      }],
    'links': [<JSONLink>{
      'id': 'tqfYRubEzW',
      'sourcePortId': 'Signal.KsNZw9NetO.output',
      'targetPortId': 'Sleep.zmZCqheRDy.input'
    }, {
      'id': 'BMsVPhDKWa',
      'sourcePortId': 'Sleep.zmZCqheRDy.output',
      'targetPortId': 'ConsoleLog.BNgZOoqIwZ.input'
    }],
    'params': [],
    'onConnect': [null]
  }
}

const diagramJSON = new DiagramBuilder()
  .add(Signal)
  .add(Sleep)
  .add(ConsoleLog)
  .get();
describe('convertParams', () => {
  it('should convert signal params', () => {
    const signalParams = convertParams(diagramJSON.nodes[0].params)
    expect(signalParams).toEqual({
      period: 50,
      count: 300,
      expression: '{\n  id: ${i}\n}'
    });
  });

  it('should convert sleep params', () => {
    const sleepParams = convertParams(diagramJSON.nodes[1].params)
    expect(sleepParams).toEqual({
      duration: '100'
    });
  });

  it('should convert console log params', () => {
    const consoleLogParams = convertParams(diagramJSON.nodes[2].params)
    expect(consoleLogParams).toEqual({
      message: ''
    });
  });
})

describe('convertNodesToElements', () => {
  it('should convert nodes to elements', () => {
    const elements = convertNodesToElements(diagramJSON.nodes);

    expect(elements.length).toBe(3);
    expect(elements[0].elementName).toBe('signal');
    expect(elements[1].elementName).toBe('sleep');
    expect(elements[2].elementName).toBe('consoleLog');
  })
})

describe('convertElementsWithLinks', () => {
  it('should convert elements with links', () => {
    const elements = convertNodesToElements(diagramJSON.nodes);
    const elementsWithLinks = convertElementsWithLinks(diagramJSON.links, elements);
    const elementNames = elementsWithLinks.map(ele => ele.elementName);

    expect(elementsWithLinks.length).toBe(5);
    expect(elementNames).toEqual(['signal', 'link', 'sleep', 'link', 'consoleLog']);
  })
});
