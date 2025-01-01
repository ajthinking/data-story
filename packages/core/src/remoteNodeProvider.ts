import { multiline, nodes } from '.';
import { Application } from './Application';
import { str } from './Param';

export const remoteNodeProvider = {
  boot: async (app: Application) => {
    // *************************************
    // Make a nested node
    // *************************************
    const nestedNode = app.getDiagramBuilder()
      .withParams([
        str({
          name: 'stamp',
          value: 'secret message passed'
        }
        )
      ])
      .add('Input', { port_name: 'input' })
      .add('Map', {
        mapper: multiline`
          item => ({
            ...item,
            global_param_access: '@{stamp}',
          })`
      })
      .add('Output', { port_name: 'stamped' })
      .get();

    // *************************************
    // Add nested node to app
    // *************************************
    app.addNestedNode('FooBarStamper', nestedNode);
  }
};