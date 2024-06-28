import { diagramJson } from './diagramJson';
import { DataStoryElement, OperatorElement } from './circuitElement';
import { signal } from './nodes/signal';
import { sleep } from './nodes/sleep';
import { consoleLog } from './nodes/consoleLog';

console.log(diagramJson)

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
  console.log(result)
  return result;
};

export const convertNodesToElements = (nodes: Record<string, any>[]): DataStoryElement[] => {
  const eles = nodes.map(node => {
    const param = convertParams(node.params);
    const { type } = node;
    // @ts-ignore
    const element = allElements[type].boot(param) as DataStoryElement;
    console.log(element)
    return element;
  })
  return eles;
};

export function convertElementsWithLinks(links: any, elements: DataStoryElement[]) {

}

export const convertJSONToDiagram = (json: string) => {
  const { name, diagram } = JSON.parse(json);
  const { nodes, links } = diagram;
  const elements = convertNodesToElements(nodes);
  convertElementsWithLinks(links, elements);
}
