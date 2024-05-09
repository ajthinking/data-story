import { ItemValue } from './types/ItemValue';
import { InputObserveConfig } from './types/InputObserveConfig';
import { InputObserver } from './types/InputObserver';
import { ReportCallback } from './types/ReportCallback';

export class InputObserverController {

  /**
   * Constructs an instance of InputObserverController
   */
  constructor(
    private inputObservers: InputObserver[] = [],
    private notifyObservers: ReportCallback
  ) {}

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  isReport = (inputObserver: InputObserveConfig): InputObserver[] => {
    return this.inputObservers.filter(
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
  reportItems(inputObserver: InputObserveConfig, items: ItemValue[]): void {
    const inputObservers = this.isReport(inputObserver);
    if (inputObservers.length > 0) {
      this.notifyObservers(inputObservers, items);
    }
  }
}
