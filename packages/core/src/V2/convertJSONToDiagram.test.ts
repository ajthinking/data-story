import { describe, expect } from 'vitest';
import { convertElementsWithLinks, convertNodesToElements, convertParams } from './convertJSONToDiagram';
import { ConsoleLog, Signal, Sleep } from '../computers';
import { core } from '../core';

export interface JSONLink {
  id: string;
  sourcePortId: string;
  targetPortId: string;
}

const diagramJSON = core.getDiagramBuilder()
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
