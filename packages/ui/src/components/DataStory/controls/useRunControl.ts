import { useState, useCallback, useMemo } from 'react';
import { createDataStoryId, debounce } from '@data-story/core';
import { useStore } from '../store/store';
import { DataStoryEvents, DataStoryEventType } from '../events/dataStoryEventType';
import { useDataStoryEvent } from '../events/eventManager';

export function useRunControl() {
  const isRunning = useStore((state) => state.isRunning);
  const setIsRunning = useStore((state) => state.setIsRunning);
  const executionId = useStore((state) => state.executionId);
  const setExecutionId = useStore((state) => state.setExecutionId);
  const onRun = useStore((state) => state.onRun);
  const abortExecution = useStore((state) => state.abortExecution);

  const handleRun = useMemo(
    () => debounce(async () => {
      if (isRunning && executionId) {
        abortExecution(executionId);
        setIsRunning(false);
      } else {
        const tempExecutionId = createDataStoryId();
        setExecutionId(tempExecutionId);
        onRun(tempExecutionId);
        setIsRunning(true);
      }
    }, 300),
    [isRunning, executionId, abortExecution, onRun],
  );

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    const stopRunning =
      event.type === DataStoryEvents.RUN_ABORT ||
      event.type === DataStoryEvents.RUN_ERROR ||
      event.type === DataStoryEvents.RUN_SUCCESS;
    if (stopRunning) {
      setIsRunning(false);
      setExecutionId('');
    }
  }, []);
  useDataStoryEvent(dataStoryEvent);

  return { isRunning, handleRun };
}
