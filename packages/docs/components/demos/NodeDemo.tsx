import { DataStory, DataStoryNodeComponent } from '@data-story/ui'
import '@data-story/ui/dist/data-story.css';
import { ConsoleLog, Application, DiagramBuilder, Signal, Merge, coreNodeProvider } from "@data-story/core";
import { ReactFlowProvider } from 'reactflow'

export default () => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Merge)
    .get()

  return (<div>
    <div className="w-full sm:w-1/2" style={{ height: '36vh' }}>
      <DataStory
        server={{ type: 'JS', app }}
        diagram={diagram}
        hideToolbar={true}
      />
    </div>

    {/* <ReactFlowProvider>
      <DataStoryNodeComponent
        id={'dummy'}
        data={{
          label: 'Dummy',
          computer: 'dummy',
          inputs: [{
            id: 'in',
            name: 'in',
            schema: {},
          }],
          outputs: [],
          params: {},
        }}
        selected={false}
      />
    </ReactFlowProvider> */}


  </div>
  );
};