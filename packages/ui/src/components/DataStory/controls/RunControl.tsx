import { ControlButton } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { useStore } from '../store/store';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { AbortIcon } from '../icons/abortIcon';
import { DataStoryEvents, DataStoryEventType } from '../events/dataStoryEventType';
import { useDataStoryEvent } from '../events/eventManager';
import { useRunControl } from './useRunControl';

export const RunControl = () => {
  const { isRunning, handleRun } = useRunControl();

  return (
    <ControlButton
      title="Run"
      aria-label="run"
      onClick={handleRun}
    >
      {isRunning ? <AbortIcon /> : <RunIcon />}
    </ControlButton>
  );
};