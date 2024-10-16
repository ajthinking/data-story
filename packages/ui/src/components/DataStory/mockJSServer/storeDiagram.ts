import { Diagram } from '@data-story/core';

export interface LocalDiagram {
  type: 'load' | 'save';
  version: string;
  name: string;
  diagram: Diagram | null;
}

const getCoreVersion = () => {
  const { version } = require('packages/core/package.json');
  return version;
}

const saveDiagram = (key: string, diagram: Diagram) => {
  try {
    // There's no need to save the diagram's `link label` and `link labelBgStyle`
    const links = diagram.links.map(link => {
      const { label, labelBgStyle, ...rest } = link;
      return rest;
    });

    const savedDiagram = {
      ...diagram,
      links
    };

    const diagramJSON = JSON.stringify({
      type: 'save',
      version: getCoreVersion(),
      name: key,
      diagram: savedDiagram
    } as LocalDiagram);

    localStorage?.setItem(key, diagramJSON);
    // successToast('Diagram saved successfully!');
  } catch(e) {
    // errorToast('Could not save diagram!');
    console.error(e);
  }
};

export const loadDiagram = (key: string): LocalDiagram => {
  const initDiagram: LocalDiagram = {
    type: 'load',
    version: getCoreVersion(),
    name: key,
    diagram: null
  }

  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return initDiagram;
  }

  const json = localStorage?.getItem(key);
  const { name, diagram } = JSON.parse(json!);

  initDiagram.diagram = new Diagram({
    nodes: diagram.nodes,
    links: diagram.links
  });

  initDiagram.name = name;

  return initDiagram;
}
