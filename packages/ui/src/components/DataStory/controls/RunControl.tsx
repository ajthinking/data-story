import { ControlButton } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { useStore } from '../store/store';
import { useCallback, useState } from 'react';
import { AbortIcon } from '../icons/abortIcon';
import { DataStoryEvents, DataStoryEventType } from '../events/dataStoryEventType';
import { useDataStoryEvent } from '../events/eventManager';
import { createDataStoryId } from '@data-story/core';
// todo: refactor the running state and click throttle
export const RunControl = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const onRun = useStore((state) => state.onRun);
  const abortRun = useStore((state) => state.abortRun);
  const [executionId, setExecutionId] = useState<string>('');
  // todo: 防止连续点击
  const handleRun = () => {
    if (isRunning && executionId) {
      abortRun(executionId);
    } else {
      const tempExecutionId = createDataStoryId();
      setExecutionId(tempExecutionId);
      onRun(tempExecutionId);
    }
    setIsRunning(pre => !pre);
  };

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_SUCCESS) {
      setIsRunning(false);
      setExecutionId('');
    }
    if (event.type === DataStoryEvents.RUN_ABORT_SUCCESS) {
      setIsRunning(false);
      setExecutionId('');
    }
  }, []);
  useDataStoryEvent(dataStoryEvent);

  return (
    <ControlButton
      title="Run"
      aria-label="run"
      onClick={handleRun}
    >
      {isRunning ? <AbortIcon /> : <RunIcon/> }
    </ControlButton>
  );
};