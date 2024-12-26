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
      .add(nodes.Input, { port_name: 'input' })
      .add(nodes.Map, {
        mapper: multiline`
          item => ({
            ...item,
            global_param_access: '@{stamp}',
          })`
      })
      .add(nodes.Output, { port_name: 'stamped' })
      .get();

    // *************************************
    // Add nested node to app
    // *************************************
    app.addNestedNode('FooBarStamper', nestedNode);

    console.log({
      msg: 'after booting remoteNodeProvider',
      appNodes: app.descriptions()
    })
  }
};