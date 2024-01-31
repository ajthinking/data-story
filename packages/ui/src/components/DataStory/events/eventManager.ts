import { asyncScheduler, observeOn, Subject } from 'rxjs';
import { EventHandler, EventTypes } from './eventTypes';

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
  on(handler: ((value: EventTypes) => void)) {

    return this.subject.pipe(
      observeOn(asyncScheduler)
    ).subscribe(handler as unknown as ((value: unknown) => void));
  }
}

/**
 * global singleton event manager
 */
export const eventManager = new EventManager();
