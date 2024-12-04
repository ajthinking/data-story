import { DataStory } from '@data-story/ui'
import { Application, core, coreNodeProvider, multiline, nodes, str, UnfoldedDiagramFactory, } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import useRequest from 'ahooks/lib/useRequest';

export default ({ part }: {part: 'MAIN' | 'NESTED_NODE' | 'MAIN_UNFOLDED'}) => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  // *************************************
  // Make a nested node
  // *************************************
  const nestedNode = core.getDiagramBuilder()
    .withParams([
      str({
        name: 'stamp',
        value: 'foo'
      }
      )
    ])
    .add(nodes.Input, { port_name: 'input' })
    .add(nodes.Map, {
      mapper: multiline`
        item => ({
          foo: 'bar',
          global_param_access: 'The foo stamp was >>>@{stamp}<<<',
        })`
    })
    .add(nodes.Output, { port_name: 'stamped' })
    .get()

  // *************************************
  // Make app, register nested node
  // *************************************

  const { data: app, loading } = useRequest(async() => {
    let app = new Application();
    app.register(coreNodeProvider);
    app.addNestedNode('FooBarStamper', nestedNode);
    app = await app.boot();
    return app;
  });

  // *************************************
  // Build main diagram, use the nested node
  // *************************************
  const diagram = core.getDiagramBuilder()
    .add({ ...Create, label: 'Users' }, {
      data: JSON.stringify([
        { name: 'Alice', age: 23 },
        { name: 'Bob', age: 34 },
        { name: 'Charlie', age: 45 },
      ])
    })
    .addNestedNode('FooBarStamper', nestedNode)
    .add(Table)
    .get()

  // *************************************
  // Unfold diagram (for visualization purposes)
  // *************************************
  const nestedNodes = {
    'FooBarStamper': nestedNode,
  }

  const unfolded = new UnfoldedDiagramFactory(
    diagram.clone(),
    nestedNodes
  ).unfold();

  const mainClient = new CustomizeJSClient({ diagram: diagram, app: app });
  const mainUnfoldedClient = new CustomizeJSClient({ diagram: unfolded.diagram, app: app });
  const nestedNodeClient = new CustomizeJSClient({ diagram: nestedNode, app: app });

  if (loading || !mainClient) return null;
  // *************************************
  // Render requested part
  // *************************************
  return (
    <div className="w-full h-1/4">
      {part === 'MAIN' && <DataStory
        hideControls={['save']}
        onInitialize={({ run }) => run()}
        client={mainClient}
      />}
      {part === 'NESTED_NODE' && <DataStory
        hideControls={['save']}
        client={nestedNodeClient}
      />}
      {part === 'MAIN_UNFOLDED' && <DataStory
        hideControls={['save']}
        client={mainUnfoldedClient}
      />}
    </div>
  );
};
