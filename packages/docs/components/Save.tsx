import { ControlButton } from '@xyflow/react';
import React, { useCallback } from 'react';
import { DataStoryEvents, DataStoryEventType, SaveIcon, useDataStoryControls, useDataStoryEvent } from '@data-story/ui';
import { Bounce, toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig: ToastOptions = {
  position: 'top-right',
  style: { top: '100px' },
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
  transition: Bounce,
}

export function errorToast(content: string): void {
  toast.error(content, toastConfig);
}

export function successToast(content: string): void {
  toast.success(content, toastConfig);
}

const initToast = (event: DataStoryEventType) => {
  if (event.type === DataStoryEvents.RUN_SUCCESS) {
    successToast('Diagram executed successfully!');
  }

  if (event.type === DataStoryEvents.RUN_ERROR) {
    errorToast('Diagram execution failed!');
  }
};

export const SaveComponent = () => {
  const { onSave } = useDataStoryControls();
  useDataStoryEvent(initToast);

  const handleSave = useCallback(() => {
    onSave?.();
  }, [onSave]);

  return (
    <>
      <ControlButton
        title="Save"
        aria-label="Save"
        onClick={handleSave}>
        <SaveIcon/>
      </ControlButton>
      <ToastContainer/>
    </>
  );
}
