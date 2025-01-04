import { InputObserverController}  from './InputObserverController';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DiagramObserverStorage } from './storage/diagramObserverStorage';
import { NodeId } from './types/Node';
import { NodeStatus } from './Executor';
import { ObserveLinkCounts, ObserveLinkItems, ObserveLinkUpdate, ObserveNodeStatus } from './types/ExecutionObserver';
import { RequestObserverType } from './types/InputObserveConfig';
import { LinkId } from './types/Link';
import { ItemValue } from './types/ItemValue';
import { sleep } from './utils/sleep';
import { LinkItemsParam } from './types/LinkItemsParam';

describe('InputObserverController', () => {
  it('should be defined', () => {
    expect(InputObserverController).toBeDefined();
  });

  describe('Node Status', () => {
    it('should be defined', () => {
      expect(InputObserverController.prototype.reportNodeStatus).toBeDefined();
    });

    it('should return undefined if node status is not set', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      const status = await mockStorage.getNodeStatus('nodeId');
      expect(status).toBeUndefined();
    });

    it('should set and get node status', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      await controller.reportNodeStatus('nodeId', 'BUSY');
      const status = await mockStorage.getNodeStatus('nodeId');
      expect(status).toEqual('BUSY');
    });

    it('should emit node status', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addNodeStatusObserver({
        observerId: 'observerId',
        nodeIds: ['nodeId'],
        onReceive: ({nodes}) => {
          expect(nodes).toEqual([{nodeId: 'nodeId', status: 'BUSY'}]);
        }
      } as ObserveNodeStatus);

      controller.reportNodeStatus('nodeId', 'BUSY');
    });

    it('should emit node status with throttle', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addNodeStatusObserver({
        observerId: 'observerId',
        nodeIds: ['nodeId'],
        throttleMs: 100,
        onReceive: ({nodes}) => {
          expect(nodes).toEqual([{nodeId: 'nodeId', status: 'BUSY'}]);
        }
      } as ObserveNodeStatus);

      controller.reportNodeStatus('nodeId', 'BUSY');
    });

    it('should emit node status with multiple nodes', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addNodeStatusObserver({
        observerId: 'observerId',
        nodeIds: ['nodeId1', 'nodeId2'],
        onReceive: ({nodes}) => {
          expect(nodes).toEqual([{nodeId: 'nodeId1', status: 'BUSY'}, {nodeId: 'nodeId2', status: 'BUSY'}]);
        }
      } as ObserveNodeStatus);

      controller.reportNodeStatus('nodeId1', 'BUSY');
      controller.reportNodeStatus('nodeId2', 'BUSY');
    });

    it('should emit node status with multiple observers', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addNodeStatusObserver({
        observerId: 'observerId1',
        nodeIds: ['nodeId1'],
        onReceive: ({nodes}) => {
          expect(nodes).toEqual([{nodeId: 'nodeId1', status: 'COMPLETE'}]);
        }
      } as ObserveNodeStatus);

      controller.reportNodeStatus('nodeId1', 'BUSY');
      controller.reportNodeStatus('nodeId1', 'COMPLETE');
    });

    it('should emit node status with async storage', async () => {
      const nodeStatusStorage = new Map<NodeId, NodeStatus>();
      const mockStorage = new DiagramObserverStorage(
        undefined,
        undefined,
        nodeStatusStorage
      );
      mockStorage.setNodeStatus = async (nodeId: NodeId, status: NodeStatus) => {
        await new Promise((resolve) => setTimeout(() => {
          nodeStatusStorage.set(nodeId, status);
          resolve(true);
        }, 200));
      }

      const controller = new InputObserverController(mockStorage);

      controller.addNodeStatusObserver({
        observerId: 'observerId',
        nodeIds: ['nodeId1'],
        throttleMs: 0,
        onReceive: ({nodes}) => {
          expect(nodes).toEqual([{nodeId: 'nodeId1', status: 'BUSY'}]);
        }
      } as ObserveNodeStatus);

      await controller.reportNodeStatus('nodeId1', 'BUSY');
    });
  });

  describe('links Count', () => {
    it('should be defined', () => {
      expect(InputObserverController.prototype.reportLinksCount).toBeDefined();
    });

    it('should return undefined if link count is not set', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      const count = await mockStorage.getLinkCount('linkId');
      expect(count).toBeUndefined();
    });

    it('should set and get link count', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      await controller.reportLinksCount({
        type: RequestObserverType.observeLinkCounts,
        linkId: 'linkId', count: 10});
      const count = await mockStorage.getLinkCount('linkId');
      expect(count).toEqual(10);
    });

    it('should emit link count', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linksCountObserver = { type: RequestObserverType.observeLinkCounts,
        linkId: 'linkId', count: 10} as const;

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObserveLinkCounts);

      controller.reportLinksCount(linksCountObserver);
    });

    it('should emit link count with throttle', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linksCountObserver = { type: RequestObserverType.observeLinkCounts,
        linkId: 'linkId', count: 10} as const;

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        throttleMs: 100,
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObserveLinkCounts);

      controller.reportLinksCount(linksCountObserver);
    });

    it('should emit link count with multiple links', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId1', 'linkId2'],
        onReceive: ({links}) => {
          expect(links).toEqual([
            { type: RequestObserverType.observeLinkCounts, linkId: 'linkId1', count: 10},
            { type: RequestObserverType.observeLinkCounts, linkId: 'linkId2', count: 20}
          ]);
        }
      } as ObserveLinkCounts);

      controller.reportLinksCount({ type: RequestObserverType.observeLinkCounts, linkId: 'linkId1', count: 10});
      controller.reportLinksCount({ type: RequestObserverType.observeLinkCounts, linkId: 'linkId2', count: 20});
    });

    it('should emit link count with async storage', async () => {
      const linkCountsStorage = new Map<LinkId, number>();
      const mockStorage = new DiagramObserverStorage(
        linkCountsStorage,
        undefined,
        undefined,
      );
      mockStorage.setLinkCount = async (linkId: LinkId, count: number) => {
        await new Promise((resolve) => setTimeout(() => {
          linkCountsStorage.set(linkId, count);
          resolve(true);
        }, 200));
      }

      const linksCountObserver = { type: RequestObserverType.observeLinkCounts,
        linkId: 'linkId', count: 10} as const;
      const controller = new InputObserverController(mockStorage);

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObserveLinkCounts);

      await controller.reportLinksCount(linksCountObserver);
    });
  });

  describe('link items', () => {
    it('should be defined', () => {
      expect(InputObserverController.prototype.reportItems).toBeDefined();
    });

    it('should return undefined if link items are not set', async () => {
      const mockStorage = new DiagramObserverStorage();

      const items = await mockStorage.getLinkItems({
        linkId: 'linkId', offset: 0, limit: 100
      });
      expect(items).toEqual([]);
    });

    it('should set and get link items', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      await controller.reportItems({
        type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]});

      const items = await mockStorage.getLinkItems({ linkId: 'linkId', offset: 0, limit: 100 });
      expect(items).toEqual([{value: 1}]);
    });

    it('should emit link items', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linkItemsParam: LinkItemsParam = { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]};

      controller.addLinkItemsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        throttleMs: 0,
        onReceive: (items) => {
          expect(items).toEqual([linkItemsParam]);
        }
      } as ObserveLinkItems);

      controller.reportItems(linkItemsParam);
    });

    it('should emit link items with throttle', async () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linkItemsParam: LinkItemsParam = { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]};

      controller.addLinkItemsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        throttleMs: 10,
        onReceive: (items) => {
          expect(items).toEqual([linkItemsParam]);
        }
      } as ObserveLinkItems);

      await controller.reportItems(linkItemsParam);
      await sleep(20);
    });

    it('should emit link items with multiple links', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linkItemsParam1: LinkItemsParam = { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId1', items: [{value: 1}]};
      const linkItemsParam2: LinkItemsParam = { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId2', items: [{value: 2}]};

      controller.addLinkItemsObserver({
        observerId: 'observerId',
        linkIds: ['linkId1', 'linkId2'],
        throttleMs: 0,
        onReceive: (items) => {
          expect(items).toEqual([linkItemsParam1, linkItemsParam2]);
        }
      } as ObserveLinkItems);

      controller.reportItems(linkItemsParam1);
      controller.reportItems(linkItemsParam2);
    });

    it('should emit link items with async storage', async () => {
      const linkItemsStorage = new Map<LinkId, ItemValue[]>();
      const mockStorage = new DiagramObserverStorage(
        undefined,
        linkItemsStorage,
        undefined,
      );

      mockStorage.appendLinkItems = async (linkId: LinkId, items: ItemValue[]) => {
        await new Promise((resolve) => setTimeout(() => {
          const currentItems = linkItemsStorage.get(linkId) ?? [];
          linkItemsStorage.set(linkId, currentItems.concat(items));
          resolve(true);
        }, 50));
      }

      const controller = new InputObserverController(mockStorage);

      controller.addLinkItemsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        throttleMs: 200,
        onReceive: (items) => {
          console.log('onReceive addlinkItemsObserver', items);
          expect(items).toEqual([{ type: RequestObserverType.observeLinkItems, linkId: 'linkId', items: [{value: 1}, {value: 2}]}]);
        }
      } as ObserveLinkItems);

      await controller.reportItems( { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]});
      await controller.reportItems( { type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 2}]});
      await sleep(100);
    });
  });

  describe('observeLinkUpdate', () => {
    let observer: ObserveLinkUpdate;
    let controller: InputObserverController;
    beforeEach(() => {
      observer = {
        linkIds: ['linkId'],
        onReceive: vi.fn(),
        type: RequestObserverType.observeLinkUpdate,
        observerId: 'observerId',
        throttleMs:0,
      };

      const mockStorage = new DiagramObserverStorage();
      controller = new InputObserverController(mockStorage);
    });

    it('should call onReceive when items are received', async() => {
      controller.observeLinkUpdate(observer);

      await controller.reportItems({
        type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]});
      await sleep(1);

      expect(observer.onReceive).toHaveBeenCalledTimes(1);
      expect(observer.onReceive).toHaveBeenCalledWith(observer.linkIds);
    });

    it('should not call onReceive when no items are received', async () => {
      controller.observeLinkUpdate(observer);
      await sleep(1);

      expect(observer.onReceive).not.toHaveBeenCalled();
    });

    it('should call onReceive when multiple items are received', async() => {
      controller.observeLinkUpdate(observer);

      await controller.reportItems({
        type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]});
      await sleep(1);
      await controller.reportItems({
        type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 2}]});
      await sleep(1);

      expect(observer.onReceive).toHaveBeenCalledTimes(2);
      expect(observer.onReceive).toHaveBeenCalledWith(observer.linkIds);
    });

    it('should call onReceive when items are received with throttle', async() => {
      observer.throttleMs = 10;
      controller.observeLinkUpdate(observer);

      await controller.reportItems({
        type: RequestObserverType.observeLinkItems,
        linkId: 'linkId', items: [{value: 1}]});
      await sleep(1);

      expect(observer.onReceive).toHaveBeenCalledTimes(0);

      await sleep(10);
      expect(observer.onReceive).toHaveBeenCalledTimes(1);
      expect(observer.onReceive).toHaveBeenCalledWith(observer.linkIds);
    });
  });

  // todo: add test for deleteExecutionObserver and observerMap
});