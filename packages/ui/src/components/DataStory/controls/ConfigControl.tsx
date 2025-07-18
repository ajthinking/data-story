import { ControlButton } from '@xyflow/react';
import { ConfigIcon } from '../icons/configIcon';
import { useDataStoryControls } from './DataStoryControls';

export const ConfigControl = () => {
  const { setShowConfig } = useDataStoryControls();

  return (
    <>
      <ControlButton
        title="Config"
        aria-label="config"
        onClick={() => setShowConfig(true)}
      >
        <ConfigIcon />
      </ControlButton>
    </>
  );
};
