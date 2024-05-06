import { ItemValue } from './types/ItemValue';

type InputObserver = {nodeId: string, portId?: string};

export class InputObserverController {
  private inputObservers: InputObserver[];
  private sendMsg: (items: ItemValue[]) => void;

  /**
   * Constructs an instance of InputObserverController.
   */
  constructor(
    inputObservers: {nodeId: string, portId?: string}[],
    sendMsg: (items: ItemValue[]) => void) {
    this.inputObservers = inputObservers;
    this.sendMsg = sendMsg;
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
      this.sendMsg(items);
    }
  }
}
