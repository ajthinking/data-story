import { ControlButton } from '@xyflow/react';
import { RunIcon } from '../icons/runIcon';
import { useStore } from '../store/store';
import { ControlsType } from '../types';

export const RunControl = () => {
  const onRun = useStore((state) => state.onRun);

  return (
    <ControlButton
      title="Run"
      aria-label="run"
      onClick={() => onRun()}
    >
      <RunIcon/>
    </ControlButton>
  );
};

RunControl.defaultProps = {
  ariaLabel: 'run'  as ControlsType,
};
