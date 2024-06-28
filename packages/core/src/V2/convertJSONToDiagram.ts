import { DataStoryElement } from './circuitElement';
import { signal } from './nodes/signal';
import { sleep } from './nodes/sleep';
import { consoleLog } from './nodes/consoleLog';
import { JSONLink } from './convertJSONToDiagram.test';
import { link as DLink } from './nodes/link';

const allElements = {
  Signal: signal,
  Sleep: sleep,
  ConsoleLog: consoleLog
}

export const convertParams = (params: Record<string, any>[]): Record<string, any> => {
  const result = params.reduce((acc, param) => {
    const { name, value, type } = param;
    acc[name] = type === 'StringableParam' ? value.value : value;
    return acc;
  }, {});
  return result;
};

export const convertNodesToElements = (nodes: Record<string, any>[]): DataStoryElement[] => {
  const eles = nodes.map(node => {
    const param = convertParams(node.params);
    const { type } = node;
    // @ts-ignore
    const element = allElements[type].boot(param) as DataStoryElement;
    return element;
  })
  return eles;
};

export function convertElementsWithLinks(links: JSONLink[], elements: DataStoryElement[]) {
  const getNodeNameAndPort = (portId: string) => {
    const [nodeName, orderName, portName] = portId.split('.');
    return { nodeName, portName };
  }
  let result = elements;
  links.forEach(link => {
    const { nodeName: targetNodeName, portName: targetPortName } = getNodeNameAndPort(link.targetPortId);
    const { nodeName: sourceNodeName, portName: sourcePortName } = getNodeNameAndPort(link.sourcePortId);
    const sourceElement = elements.find(ele => ele.elementName.toLowerCase() === sourceNodeName.toLowerCase());
    const targetElement = elements.find(ele => ele.elementName.toLowerCase() === targetNodeName.toLowerCase());
    if (sourceElement && targetElement) {
      const linkEle = DLink.boot({ from: sourcePortName, to: targetPortName });
      // insert linkEle between sourceElement and targetElement
      result.splice(result.indexOf(sourceElement) + 1, 0, linkEle);
    }
  });
  return result;
}

export const convertJSONToDiagram = (json: string): DataStoryElement[] => {
  const { name, diagram } = JSON.parse(json);
  const { nodes, links } = diagram;
  const elements = convertNodesToElements(nodes);
  return convertElementsWithLinks(links, elements);
}
