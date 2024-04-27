import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  multiline,
  str,
} from '@data-story/core';

import useWindowDimensions from '../../hooks/useWindowDimensions';

export default () => {
  const app = new Application();

  app.register(coreNodeProvider);

  app.boot();

  const { Signal, Table } = nodes;

  const diagram = new DiagramBuilder()
    .add(Signal, { count: '@{SIGNAL_COUNT_GLOBAL_PARAM}' })
    .add(Table)
    .get()

  diagram.params = [
    str({
      name: 'SIGNAL_COUNT_GLOBAL_PARAM',
      value: '5'
    })
  ]

  return (
    <div className="w-full h-1/2">
      <DataStory
        server={{ type: 'JS', app }}
        initDiagram={diagram}
      />
    </div>
  );
};
