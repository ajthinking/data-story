import { ItemValue } from './types/ItemValue';
import { InputObserveConfig, RequestObserverType } from './types/InputObserveConfig';
import { InputObserver } from './types/InputObserver';
import { ReportCallback } from './types/ReportCallback';
import { ItemsObserver } from '@data-story/ui/dist/src/components/DataStory/types';

export class InputObserverController {

  /**
   * Constructs an instance of InputObserverController
   */
  constructor(
    private inputObservers: InputObserver[] = [],
    private notifyObservers: ReportCallback
  ) {
  }

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  private isReport = (inputObserver: InputObserveConfig): InputObserver[] => {
    if ('linkId' in inputObserver) {
      return this.inputObservers.filter(
        // @ts-ignore
        ({ linkId }) => linkId === inputObserver.linkId
      );
    }
    return this.inputObservers.filter(
      // @ts-ignore
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
      // this.notifyObservers({items, inputObserver, inputObservers});
    }
  }
}

type MemoryItemObserver = {
  type: RequestObserverType;
  linkId: string;
  items: ItemValue[];
}

/**
 * todo:
 * 1. 将 InputObserverController1 模仿 InputObserverController 的传参进入 ExecutionMemory
 * 2. 走通 type: RequestObserverType.ItemsObserver 的流程
 * 3. 使用 type: RequestObserverType.ItemsObserver 替代 NotifyObservers
 */
export class InputObserverController1 {

  public executionObservers: ItemsObserver[] = [];

  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {
  }

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