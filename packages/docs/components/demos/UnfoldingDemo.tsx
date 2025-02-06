import { useState, useEffect } from 'react';
import { DataStory } from '@data-story/ui';
import { multiline, str, UnfoldedDiagramFactory } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

export default ({ part }: { part: 'MAIN' | 'NESTED_NODE' | 'MAIN_UNFOLDED' }) => {
  const { app: bootedApp, loading: isBooting } = useRequestApp();
  const [clients, setClients] = useState<{
    mainClient?: CustomizeJSClient;
    mainUnfoldedClient?: CustomizeJSClient;
    nestedNodeClient?: CustomizeJSClient;
  }>({});

  useEffect(() => {
    if (!bootedApp || isBooting) return;

    const initializeClients = async () => {
      // *************************************
      // Make a nested node
      // *************************************
      const nestedNode = bootedApp
        .getDiagramBuilder()
        .withParams([
          str({
            name: 'stamp',
            value: 'foo',
          }),
        ])
        .add('Input', { port_name: 'input' })
        .add('Map', {
          mapper: multiline`
            item => ({
              foo: 'bar',
              global_param_access: 'The foo stamp was >>>@{stamp}<<<',
            })`,
        })
        .add('Output', { port_name: 'stamped' })
        .connect()
        .place()
        .get();

      // *************************************
      // Make app, register nested node
      // *************************************
      bootedApp.addNestedNode('FooBarStamper', nestedNode);

      // *************************************
      // Build main diagram, use the nested node
      // *************************************
      const diagram = bootedApp
        .getDiagramBuilder()
        .add('Create', {
          label: 'Users',
          data: JSON.stringify([
            { name: 'Alice', age: 23 },
            { name: 'Bob', age: 34 },
            { name: 'Charlie', age: 45 },
          ]),
        })
        .add('FooBarStamper')
        .add('Table')
        .connect()
        .place()
        .get();

      // *************************************
      // Unfold diagram (for visualization purposes)
      // *************************************
      const nestedNodes = {
        FooBarStamper: nestedNode,
      };

      const unfolded = new UnfoldedDiagramFactory(diagram.clone(), nestedNodes).unfold();

      console.log({
        msg: 'Main Client Diagram',
        diagram,
      })

      // Create clients
      const mainClient = new CustomizeJSClient({ diagram, app: bootedApp });
      const mainUnfoldedClient = new CustomizeJSClient({ diagram: unfolded.diagram, app: bootedApp });
      const nestedNodeClient = new CustomizeJSClient({ diagram: nestedNode, app: bootedApp });

      // Update state
      setClients({
        mainClient,
        mainUnfoldedClient,
        nestedNodeClient,
      });
    };

    initializeClients();
  }, [bootedApp, isBooting]);

  if (isBooting || !clients.mainClient) return null;

  // *************************************
  // Render requested part
  // *************************************
  return (
    <div className="w-full h-1/4">
      {part === 'MAIN' && (
        <DataStory
          hideControls={['save', 'import']}
          onInitialize={({ run }) => run()}
          client={clients.mainClient}
        />
      )}
      {part === 'NESTED_NODE' && (
        <DataStory hideControls={['save', 'import']} client={clients.nestedNodeClient!} />
      )}
      {part === 'MAIN_UNFOLDED' && (
        <DataStory hideControls={['save', 'import']} client={clients.mainUnfoldedClient!} />
      )}
    </div>
  );
};
