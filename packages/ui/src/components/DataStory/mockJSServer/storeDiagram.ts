import { Diagram } from '@data-story/core';

export interface LocalDiagram {
  type: 'load' | 'save';
  version: string;
  name: string;
  diagram: Diagram | null;
}

const getCoreVersion = () => {
  // const { version } = require('../../../../../core/package.json');
  // return version;
  return '0.0.1';
}

export const saveDiagram = (key: string, diagram: Diagram) => {
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
