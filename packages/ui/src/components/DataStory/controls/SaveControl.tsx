import { ControlButton } from '@xyflow/react';
import { SaveIcon } from '../icons/saveIcon';
import { useDataStoryControls } from './DataStoryControls';
import { ControlsType } from '../types';

export const SaveControl = () => {
  const { onSave, getDiagram } = useDataStoryControls();

  return (
    <ControlButton
      title="Save"
      aria-label="save"
      onClick={() => onSave?.(getDiagram())}
    >
      <SaveIcon/>
    </ControlButton>
  );
};

SaveControl.defaultProps = {
  ariaLabel: 'save' as ControlsType,
};
