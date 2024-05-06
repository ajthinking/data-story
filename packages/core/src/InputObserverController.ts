import { ItemValue } from './types/ItemValue';
import { InputObserver } from './types/InputObserver';
import { NotifyObserversCallback } from './types/NotifyObserversCallback';

export class InputObserverController {
  private inputObservers: InputObserver[];
  private notifyObservers: NotifyObserversCallback;

  /**
   * Constructs an instance of InputObserverController.
   */
  constructor(inputObservers: InputObserver[], notifyObservers:NotifyObserversCallback) {
    this.inputObservers = inputObservers;
    this.notifyObservers = notifyObservers;
  }

  /**
   * Determines if a report should be sent for a given link ID.
   */
  isReport = (inputObserver: InputObserver): boolean => {
    return this.inputObservers.some(
      ({ nodeId, portId = 'input' }) =>
        (nodeId === inputObserver.nodeId) && (portId === inputObserver.portId)
    );
  }

  /**
   * When we invoke `reportItems`, it sends a message to the client and passes along the `items` and inputObserver.
   */
  reportItems(inputObserver: InputObserver, items: ItemValue[]): void {
    if (this.isReport(inputObserver)) {
      this.notifyObservers(inputObserver, items);
    }
  }
}
