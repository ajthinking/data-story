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
      label: 'Products',
      outputs: ['all', 'error']
    })
    .add(Map)
    .addFake({
      label: 'OpenAI-GPT',
      inputs: ['prompt'],
      outputs: ['suggestions', 'costs', 'errors']
    })
    .addFake({
      label: 'Products.update',
      inputs: ['input'],
    })
    .below('Fake.3').addFake({
      label: 'Log',
      inputs: ['input'],
    })
    .linkByLabel('OpenAI-GPT.costs', 'Log.input')

    .above('Fake.1').add(Comment, { content: multiline`
      ### OpenAI APIs without code 💡
      Example: Improve SEO with GPT-X

      [prev](/pitchdeck/1) [next](/pitchdeck/2)
    `})

    .jiggle()

    .get()

  return (
    <div className="w-full" style={{ height: '100vh' }}>
      <DataStory
        onInitialize={(options) => options.run()}
        server={{ type: 'JS', app }}
        initDiagram={diagram}
      />
    </div>
  );
};
