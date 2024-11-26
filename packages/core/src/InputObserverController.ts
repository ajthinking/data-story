import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import { InputObserver } from './types/InputObserver';
import { ExecutionObserver, ItemsObserver, LinkCountsObserver } from './types/ExecutionObserver';

type MemoryItemObserver = {
  type: RequestObserverType.itemsObserver;
  linkId: string;
  items: ItemValue[];
}

type MemoryLinksCountObserver = {
  type: RequestObserverType.linkCountsObserver;
  linkId: string;
  count: number;
}

export class InputObserverController {

  public executionObservers: ExecutionObserver[] = [];

  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {}

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  private isReport = (inputObserver: MemoryItemObserver | MemoryLinksCountObserver, type: RequestObserverType): ExecutionObserver[] => {
    return this.executionObservers.filter((executionObserver) => {
      return executionObserver.linkIds.includes(inputObserver.linkId) && executionObserver.type === type;
    });
  }

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    const inputObservers = this.isReport(memoryObserver, RequestObserverType.itemsObserver) as ItemsObserver[];
    inputObservers.map((inputObserver) => {
      inputObserver.onReceive(memoryObserver.items, inputObserver as unknown as InputObserver);
    })
  }

  reportLinksCount(memoryObserver: MemoryLinksCountObserver): void {
    const inputObservers = this.isReport(memoryObserver, RequestObserverType.linkCountsObserver) as LinkCountsObserver[];
    inputObservers.map((inputObserver) => {
      // todo: replace the items.length with the actual count of the links count
      inputObserver.onReceive({
        [memoryObserver.linkId]: memoryObserver.count
      });
    })
  }

  pushExecutionObserver(observer: ExecutionObserver): void {
    this.executionObservers.push(observer);
  }
}