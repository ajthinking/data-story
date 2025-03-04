import { ControlButton } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { useStore } from '../store/store';
import { useState } from 'react';
import { AbortIcon } from '../icons/abortIcon';

export const RunControl = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const onRun = useStore((state) => state.onRun);
  const abortRun = useStore((state) => state.abortRun);
  const handleRun = () => {
    if (isRunning) {
      abortRun();
    } else {
      onRun();
    }
    setIsRunning(pre => !pre);
  };

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