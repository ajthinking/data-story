import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { coreNodeProvider, Application, DiagramBuilder } from '@data-story/core';
import { ConsoleLog, Map, Signal, Fake } from '@data-story/core/dist/computers';

export default () => {
  const app = new Application();

  app.register([
    coreNodeProvider
  ]);

  app.boot();

  const fake = ({
    label,
    inputs = [],
    outputs = [] 
  }: {
    label: string,
    inputs?: string[],
    outputs?: string[],
  }) => {
    return {
      ...Fake,
      label,
      inputs: inputs.map((name) => ({ name, schema: { type: 'object' } })),
      outputs: outputs.map((name) => ({ name, schema: { type: 'object' } })),
    }
  }

  // HubSpot Example
  const diagram = new DiagramBuilder() 
    .addFake({
      label: 'Lime.persons',
      outputs: ['persons', 'error']
    })
    .addFake({
      label: 'qualifyPersons',
      inputs: ['persons'],
      outputs: ['passed', 'failed']
    })
    .addFake({
      label: 'Merge',
      inputs: ['requestor', 'suppliers'],
      outputs: ['merged', 'not_merged'],
    })
    .add(Map)
    .addFake({
      label: 'Contacts.create',
      inputs: ['contacts'],
      outputs: ['created', 'error'],
    })
    .addFake({
      label: 'saveLocalCopy',
      inputs: ['input']
    })    
    .addFake({
      label: 'Owners',
      outputs: ['owners', 'error']
    })
    .linkByLabel('Owners.owners', 'Merge.suppliers')
    
    .jiggle()
    
    .get()

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        // server={{ type: 'SOCKET', url: 'ws://localhost:3100' }}
        server={{ type: 'JS', app }}
        // diagram={diagram}
      />
    </div>
  );
};