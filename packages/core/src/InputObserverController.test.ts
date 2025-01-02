import { InputObserverController}  from './InputObserverController';
import { describe, expect } from 'vitest';
import { DiagramObserverStorage } from './storage/diagramObserverStorage';
import { NodeId } from './types/Node';
import { NodeStatus } from './Executor';
import { ObserveNodeStatus } from './types/ExecutionObserver';

describe('InputObserverController', () => {
  it('should be defined', () => {
    expect(InputObserverController).toBeDefined();
  });

  describe('NodeStatus', () => {
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
});