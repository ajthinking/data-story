import { ItemValue } from './types/ItemValue';
import { InputObserver } from './types/InputObserver';
import { NotifyObserversCallback } from './types/NotifyObserversCallback';

export class InputObserverController {

  /**
   * Constructs an instance of InputObserverController
   */
  constructor(
    private inputObservers: InputObserver[] = [],
    private notifyObservers:NotifyObserversCallback
  ) {}

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  isReport = (inputObserver: InputObserver): boolean => {
    return this.inputObservers.some(
      ({ nodeId, portId }) => {
        if (portId === undefined) {
          return nodeId === inputObserver.nodeId;
        }
        return (nodeId === inputObserver.nodeId) && (portId === inputObserver?.portId)
      }
    );
  }

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(inputObserver: InputObserver, items: ItemValue[]): void {
    if (this.isReport(inputObserver)) {
      this.notifyObservers(inputObserver, items);
    }
  }
}
