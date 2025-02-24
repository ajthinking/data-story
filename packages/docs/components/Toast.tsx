import React from 'react';
import { DataStoryEvents, DataStoryEventType, useDataStoryEvent } from '@data-story/ui';
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
  switch (event.type) {
    case DataStoryEvents.RUN_SUCCESS:
      successToast('Diagram executed successfully!');
      break;
    case DataStoryEvents.RUN_ERROR:
      console.error(event.payload);
      errorToast(`Diagram execution failed! Error was: ${event.payload.error}`);
      break;
    case DataStoryEvents.SAVE_SUCCESS:
      successToast('Diagram saved successfully!');
      break;
    case DataStoryEvents.SAVE_ERROR:
      console.error(event.payload);
      errorToast('Diagram save failed!');
      break;
    case DataStoryEvents.COPY_JSON_SUCCESS:
      successToast('JSON copied to clipboard!');
      break;
    case DataStoryEvents.COPY_JSON_ERROR:
      console.error(event.payload);
      errorToast('Failed to copy JSON to clipboard!');
      break;
    default:
      break;
  }
};

export const ToastComponent = () => {
  useDataStoryEvent(initToast);

  return (
    <>
      <ToastContainer/>
    </>
  );
}
