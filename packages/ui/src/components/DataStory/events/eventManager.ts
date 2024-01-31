import { asyncScheduler, observeOn, Subject } from 'rxjs';
import { EventHandler, EventTypes } from './eventTypes';
import { useEffect } from 'react';

class EventManager {
  private subject: Subject<unknown>;
  constructor() {
    this.subject = new Subject();
  }

  /**
   * emit event
   */
  emit(event: EventTypes) {
    this.subject.next(event);
  }

  /**
   * subscribe event
   */
  on(handler: EventHandler) {

    return this.subject.pipe(
      observeOn(asyncScheduler)
    ).subscribe(handler as unknown as ((value: unknown) => void));
  }
}

/**
 * global singleton event manager
 */
export const eventManager = new EventManager();

/**
 * use hook to subscribe event
 * @param {EventHandler} handler
 */
export const useDataStoryEvent = (handler: EventHandler) => {
  useEffect(() => {
    const subscription = eventManager.on(handler);
    return () => subscription.unsubscribe();
  }, [handler]);
}
