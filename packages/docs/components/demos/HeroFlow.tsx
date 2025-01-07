import { DataStory } from '@data-story/ui'
import { core, multiline } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

const welcomeMarkdown = multiline`
    ### Welcome to DataStory 👋
    Real time data processing for NodeJS and React.  
    [docs](/docs) | [playground](/playground)
  `

// Good for computers
const diagram = core.getDiagramBuilder()
  .add('Signal', { label: 'Realtime', period: 20, count: 100000 })
  .add('Pass', { label: 'Automation' })
  .add('Ignore', { label: 'for React & NodeJS' })
  .jiggle({ x: 60, y: 25 })
  .get()

export default () => {
  const { app, loading } = useRequestApp();

  const client = new CustomizeJSClient({ app, diagram });

  if (loading || !client) return null;
  return (
    <div className="w-full h-1/2 sm:h-screen">
      <DataStory
        client={client}
        initDiagram={diagram}
        onInitialize={(options) => options.run()}
        hideControls={true}
      />
    </div>
  );
};
