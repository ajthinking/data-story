import { InputObserverController}  from './InputObserverController';
import { describe, expect } from 'vitest';
import { DiagramObserverStorage } from './storage/diagramObserverStorage';
import { NodeId } from './types/Node';
import { NodeStatus } from './Executor';
import { ObservelinkCounts, ObserveNodeStatus } from './types/ExecutionObserver';
import { RequestObserverType } from './types/InputObserveConfig';
import { LinkId } from './types/Link';

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

  describe.only('Links Count', () => {
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
        type: RequestObserverType.observelinkCounts,
        linkId: 'linkId', count: 10});
      const count = await mockStorage.getLinkCount('linkId');
      expect(count).toEqual(10);
    });

    it('should emit link count', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linksCountObserver = { type: RequestObserverType.observelinkCounts,
        linkId: 'linkId', count: 10} as const;

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObservelinkCounts);

      controller.reportLinksCount(linksCountObserver);
    });

    it('should emit link count with throttle', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);
      const linksCountObserver = { type: RequestObserverType.observelinkCounts,
        linkId: 'linkId', count: 10} as const;

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        throttleMs: 100,
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObservelinkCounts);

      controller.reportLinksCount(linksCountObserver);
    });

    it('should emit link count with multiple links', () => {
      const mockStorage = new DiagramObserverStorage();
      const controller = new InputObserverController(mockStorage);

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId1', 'linkId2'],
        onReceive: ({links}) => {
          expect(links).toEqual([{linkId: 'linkId1', count: 10}, {linkId: 'linkId2', count: 20}]);
        }
      } as ObservelinkCounts);

      controller.reportLinksCount({
        type: RequestObserverType.observelinkCounts,
        linkId: 'linkId1', count: 10});
      controller.reportLinksCount({
        type: RequestObserverType.observelinkCounts,
        linkId: 'linkId2', count: 20});
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

      const linksCountObserver = { type: RequestObserverType.observelinkCounts,
        linkId: 'linkId', count: 10} as const;
      const controller = new InputObserverController(mockStorage);

      controller.addLinkCountsObserver({
        observerId: 'observerId',
        linkIds: ['linkId'],
        onReceive: ({links}) => {
          expect(links).toEqual([linksCountObserver]);
        }
      } as ObservelinkCounts);

      await controller.reportLinksCount(linksCountObserver);
    });
  });
});