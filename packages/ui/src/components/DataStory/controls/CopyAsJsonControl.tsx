import { ControlButton } from '@xyflow/react';
import { CopyAsJsonIcon } from '../icons/copyAsJsonIcon';
import { useDataStoryControls } from './DataStoryControls';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { eventManager } from '../events/eventManager';

export const CopyAsJsonControl = () => {
  const { getDiagram } = useDataStoryControls();

  const copyAsJson = async () => {
    const diagram = getDiagram();
    console.log('diagram:', diagram);

    try {
      const jsonString = JSON.stringify({
        nodes: diagram.nodes,
        links: diagram.links,
        params: diagram.params,
        viewport: diagram.viewport,
      }, null, 2);

      await navigator.clipboard.writeText(jsonString);
      eventManager.emit({
        type: DataStoryEvents.COPY_JSON_SUCCESS,
      })
    } catch (error) {
      eventManager.emit({
        type: DataStoryEvents.COPY_JSON_ERROR,
        payload: { error },
      });
    }
  }

  return (<ControlButton
    onClick={copyAsJson}
    title="Copy as JSON"
    data-cy="copy-as-json-button"
    aria-label="copyAsJson"
  >
    <CopyAsJsonIcon/>
  </ControlButton>)
};
