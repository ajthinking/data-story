import { DataStory } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { coreNodeProvider, Application, DiagramBuilder, multiline } from '@data-story/core';
import { ConsoleLog, Map, Signal, Fake, Comment } from '@data-story/core/dist/computers';

export default () => {
  const app = new Application();

  app.register([
    coreNodeProvider
  ]);

  app.boot();

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
    .above('Fake.1').add(Comment, { content: multiline`
      ### Migrations 💡
      Example: Lime to HubSpot contact migration

      [next](/pitchdeck/2)
    `})    
    .jiggle()
    .get()

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        // server={{ type: 'SOCKET', url: 'ws://localhost:3100' }}
        server={{ type: 'JS', app }}
        callback={(options: any) => setTimeout(options.run, 100)}
        diagram={diagram}
      />
    </div>   
  );
};