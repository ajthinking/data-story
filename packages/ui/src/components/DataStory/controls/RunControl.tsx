import { ControlButton } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { useStore } from '../store/store';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { AbortIcon } from '../icons/abortIcon';
import { DataStoryEvents, DataStoryEventType } from '../events/dataStoryEventType';
import { useDataStoryEvent } from '../events/eventManager';
import { createDataStoryId, debounce } from '@data-story/core';

export const RunControl = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const onRun = useStore((state) => state.onRun);
  const abortExecution = useStore((state) => state.abortExecution);
  const [executionId, setExecutionId] = useState<string>('');

  const handleRun = debounce(async () => {
    if (isRunning && executionId) {
      abortExecution(executionId);
      setIsRunning(false);
    } else {
      const tempExecutionId = createDataStoryId();
      setExecutionId(tempExecutionId);
      onRun(tempExecutionId);
      setIsRunning(true);
    }
  }, 300);

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    const stopRunning = event.type === DataStoryEvents.RUN_ABORT || event.type === DataStoryEvents.RUN_ERROR || event.type === DataStoryEvents.RUN_SUCCESS;
    if (stopRunning) {
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