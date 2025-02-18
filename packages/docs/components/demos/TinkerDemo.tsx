import { AddNodeControl, DataStory, ExportControl, RunControl } from '@data-story/ui'
import { core, str } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';
import useRequest from 'ahooks/lib/useRequest';

// This component is just a place to sketch
export default () => {
  const { app, loading: appLoading } = useRequestApp();

  const { data: diagram, loading: diagramLoading } = useRequest(async() => {
    await core.boot();
    const diagram = core.getDiagramBuilder()
      .add('Create')
      .add('Sample')
      .add('Table')
      .add('Table')
      .connect(`
        Create.1.output ---> Sample.1.input
        Sample.1.sampled ---> Table.1.input
        Sample.1.not_sampled ---> Table.2.input
      `)
      .place()
      .jiggle()
      .get()

    diagram.params = [
      str({
        name: 'message',
        help: 'A message to pass on into the execution.',
      }),
    ]
    return diagram;
  });

  const client = new CustomizeJSClient({ diagram, app });

  if (appLoading || !client || diagramLoading) return null;
  return (
    <div className="w-full h-1/2">
      <DataStory
        client={client}
        controls={[<RunControl/>, <AddNodeControl/>, <ExportControl/>]}
      />
    </div>
  );
};
