import { Observer } from 'rxjs';

export enum DataStoryEvents {
  'RUN_START' = 'RUN_START',
  'RUN_SUCCESS' = 'RUN_SUCCESS',
  'RUN_ERROR' = 'RUN_ERROR',
  'SAVE_SUCCESS' = 'SAVE_SUCCESS',
  'SAVE_ERROR' = 'SAVE_ERROR',
  'COPY_JSON_SUCCESS' = 'COPY_JSON_SUCCESS',
  'COPY_JSON_ERROR' = 'COPY_JSON_ERROR'
}

export type DataStoryEventType = {
  type: DataStoryEvents;
  payload?: any;
}

export type EventHandler = Partial<Observer<DataStoryEventType>> | ((value: DataStoryEventType) => void);
