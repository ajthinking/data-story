import { Observer } from 'rxjs';

export enum DataStoryEvents {
  'RUN_SUCCESS' = 'RUN_SUCCESS',
  'RUN_ERROR' = 'RUN_ERROR',
  'SAVE_SUCCESS' = 'SAVE_SUCCESS',
}

export type EventTypes = {
  type: DataStoryEvents;
  payload?: any;
}

export type EventHandler = Partial<Observer<EventTypes>> | ((value: EventTypes) => void);
