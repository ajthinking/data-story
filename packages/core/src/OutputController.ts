import { ItemValue } from './types/ItemValue';

export class OutputController {
  private linkIds: {nodeId: string, portId?: string}[];
  private sendMsg: (items: ItemValue[]) => void;

  /**
   * Constructs an instance of OutputController.
   */
  constructor(
    linkIds: {nodeId: string, portId?: string}[],
    sendMsg: (items: ItemValue[]) => void) {
    this.linkIds = linkIds;
    this.sendMsg = sendMsg;
  }

  /**
   * Determines if a report should be sent for a given link ID.
   */
  isReport = (linkId: string): boolean => {
    return this.linkIds.includes(({nodeId: linkId}));
  }

  /**
   * When we invoke `reportItems`, it sends a message to the client and passes along the `items` and linkId.
   */
  reportItems(linkId: string, items: ItemValue[]): void {
    if (this.isReport(linkId)) {
      this.sendMsg(items);
    }
  }
}
