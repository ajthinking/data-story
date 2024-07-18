import { DataStory } from '@data-story/ui'
import { coreNodeProvider, Application, DiagramBuilder, multiline, nodes, core } from '@data-story/core';

const { Comment, Map } = nodes;

export default () => {
  const app = new Application();

  app.register([
    coreNodeProvider
  ]);

  app.boot();

  // HubSpot Example
  const diagram = core.getDiagramBuilder()
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
        server={{ type: 'JS', app }}
        onInitialize={(options) => options.run()}
        initDiagram={diagram}
      />
    </div>
  );
};
