import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import { InputObserver } from './types/InputObserver';
import { ItemsObserver } from '@data-story/ui/dist/src/components/DataStory/types';

type MemoryItemObserver = {
  type: RequestObserverType;
  linkId: string;
  items: ItemValue[];
}

export class InputObserverController {

  public executionObservers: ItemsObserver[] = [];

  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {}

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  private isReport = (inputObserver: MemoryItemObserver): ItemsObserver[] => {
    return this.executionObservers.filter((executionObserver) => {
      return executionObserver.linkIds.includes(inputObserver.linkId);
    })
  }

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    const inputObservers = this.isReport(memoryObserver);
    inputObservers.map((inputObserver) => {
      inputObserver.onReceive(memoryObserver.items, inputObserver as unknown as InputObserver);
    })
  }

  pushExecutionObserver(observer: ItemsObserver): void {
    this.executionObservers.push(observer);
  }
}