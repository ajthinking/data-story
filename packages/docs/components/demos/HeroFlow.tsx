import { DataStory } from '@data-story/ui'
import { core, multiline, nodes, } from '@data-story/core';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useMemo } from 'react';
import { useRequestApp } from '../hooks/useRequestApp';

const { Signal, Pass, Comment, Ignore } = nodes;

const welcomeMarkdown = multiline`
    ### Welcome to DataStory 👋
    Real time data processing for NodeJS and React.  
    [docs](/docs) | [playground](/playground)
  `

// Good for computers
const bigDiagram = core.getDiagramBuilder()
  .add({ ...Signal, label: 'Realtime' }, { period: 20, count: 100000 })
  .add({ ...Pass, label: 'Automation' })
  .add({ ...Ignore, label: 'for React & NodeJS' })
  .above('Signal.1').add(Comment, { content: welcomeMarkdown })
  .from('Signal.1.output').below('Pass.1').add({
    ...Ignore,
    label: 'in Your App',
  })
  .jiggle({ x: 60, y: 25 })
  .get()

// Good for mobile
const smallDiagram = core.getDiagramBuilder()
  .add({ ...Signal, label: 'Realtime' }, { period: 20, count: 100000 })
  .add({ ...Ignore, label: 'Automation' })
  .above('Signal.1').add(Comment, { content: welcomeMarkdown })
  .from('Signal.1.output').below('Ignore.1').add({
    ...Ignore,
    label: 'in Your App',
  })
  .jiggle({ x: 60, y: 25 })
  .get()

export default () => {
  const { height, width } = useWindowDimensions();
  const { app, loading } = useRequestApp();

  const isSmallScreen = useMemo(() => width < 768, [width]);

  const client = useMemo(() =>
    isSmallScreen ? new CustomizeJSClient({ diagram: smallDiagram, app }) : new CustomizeJSClient({ diagram: bigDiagram, app }),
  [isSmallScreen, bigDiagram, smallDiagram, app]);

  if (loading || !client) return null;
  return (
    <div className="w-full h-1/2 sm:h-screen">
      <DataStory
        client={client}
        initDiagram={isSmallScreen ? smallDiagram : bigDiagram}
        onInitialize={(options) => options.run()}
        hideControls={true}
      />
    </div>
  );
};
