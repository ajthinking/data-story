import { ExecutionMemory } from './ExecutionMemory';;
import { NodeId } from './types/Node';
import { LinkId } from './types/Link';
import { ItemValue } from './types/ItemValue';

describe('ExecutionMemory', () => {
  describe('getNodeStatus', () => {
    it('returns the correct status for a node', () => {
      const memory = new ExecutionMemory();
      memory.setNodeStatus('id', 'COMPLETE');

      const retrieved = memory.getNodeStatus('id');
      expect(retrieved).toEqual('COMPLETE');
    });

    it('returns undefined if node status is not set', () => {
      const memory = new ExecutionMemory();

      const retrieved = memory.getNodeStatus('id');
      expect(retrieved).toEqual(undefined);
    });
  });

  describe('setNodeStatus', () => {
    it('sets the status of a node correctly', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';
      const status = 'BUSY';

      memory.setNodeStatus(nodeId, status);
      const retrieved = memory.getNodeStatus(nodeId);

      expect(retrieved).toEqual(status);
    });
  });

  describe('getNodeStatuses', () => {
    it('returns all node statuses correctly', () => {
      const memory = new ExecutionMemory();
      const nodeId1: NodeId = 'node1';
      const nodeId2: NodeId = 'node2';
      const status1 = 'AVAILABLE';
      const status2 = 'COMPLETE';

      memory.setNodeStatus(nodeId1, status1);
      memory.setNodeStatus(nodeId2, status2);

      const retrieved = memory.getNodeStatuses();

      expect(retrieved.get(nodeId1)).toEqual(status1);
      expect(retrieved.get(nodeId2)).toEqual(status2);
    });

    it('returns an empty map if no node statuses are set', () => {
      const memory = new ExecutionMemory();

      const retrieved = memory.getNodeStatuses();

      expect(retrieved.size).toEqual(0);
    });
  });

  describe('getNodeRunner', () => {
    it('returns the correct runner for a node', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';
      const runner = vi.fn() as any;

      memory.setNodeRunner(nodeId, runner);

      const retrieved = memory.getNodeRunner(nodeId);
      expect(retrieved).toBe(runner);
    });

    it('returns undefined if node runner is not set', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';

      const retrieved = memory.getNodeRunner(nodeId);
      expect(retrieved).toBeUndefined();
    });
  });

  describe('setNodeRunner', () => {
    it('sets the runner of a node correctly', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';
      const runner = vi.fn() as any;

      memory.setNodeRunner(nodeId, runner);

      const retrieved = memory.getNodeRunner(nodeId);
      expect(retrieved).toBe(runner);
    });
  });

  describe('getLinkItems', () => {
    it('returns the correct items for a link', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const items: ItemValue[] = [{i: 1}, {i: 2}, {i: 3}];

      memory.setLinkItems(linkId, items);

      const retrieved = memory.getLinkItems(linkId);
      expect(retrieved).toEqual(items);
    });

    it('returns undefined if link items are not set', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';

      const retrieved = memory.getLinkItems(linkId);
      expect(retrieved).toBeUndefined();
    });
  });

  describe('pullLinkItems', () => {
    it('pulls the correct number of items from a link', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const items: ItemValue[] = [{i: 1}, {i: 2}, {i: 3}];
      memory.setLinkItems(linkId, items);

      const count = 2;
      const pulled = memory.pullLinkItems(linkId, count);

      expect(pulled).toEqual([{i: 1}, {i: 2}]);
      expect(memory.getLinkItems(linkId)).toEqual([{i: 3}]);
    });

    it('pulls all items from a link if count exceeds the number of items', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const items: ItemValue[] = [{i: 1}, {i: 2}, {i: 3}];
      memory.setLinkItems(linkId, items);

      const count = 5; // Exceeds the number of items
      const pulled = memory.pullLinkItems(linkId, count);

      expect(pulled).toMatchObject([{i: 1}, {i: 2}, {i: 3}]);
      expect(memory.getLinkItems(linkId)).toEqual([]);
    });
  });

  describe('pushLinkItems', () => {
    it('pushes items to a link correctly', () => {
      const linkId: LinkId = 'link1';

      const memory = new ExecutionMemory({
        linkItems: new Map()
          .set('link1', [{i: 1}, {i: 2}]),
      });

      memory.pushLinkItems(linkId, [{i: 3}]);

      expect(memory.getLinkItems(linkId)).toMatchObject([
        {i: 1}, {i: 2}, {i: 3}
      ]);
    });
  });

  describe('setLinkItems', () => {
    it('sets the items of a link correctly', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const items: ItemValue[] = [{i: 1}, {i: 2}];

      memory.setLinkItems(linkId, items);

      expect(memory.getLinkItems(linkId)).toEqual(items);
    });
  });

  describe('getLinkCount', () => {
    it('returns the correct count for a link', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const count = 5;

      memory.setLinkCount(linkId, count);

      const retrieved = memory.getLinkCount(linkId);
      expect(retrieved).toEqual(count);
    });

    it('returns undefined if link count is not set', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';

      const retrieved = memory.getLinkCount(linkId);
      expect(retrieved).toBeUndefined();
    });
  });

  describe('setLinkCount', () => {
    it('sets the count of a link correctly', () => {
      const memory = new ExecutionMemory();
      const linkId: LinkId = 'link1';
      const count = 5;

      memory.setLinkCount(linkId, count);

      const retrieved = memory.getLinkCount(linkId);
      expect(retrieved).toEqual(count);
    });
  });

  describe('getInputDevice', () => {
    it('returns the correct input device for a node', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';
      const device = vi.fn() as any;

      memory.setInputDevice(nodeId, device);

      const retrieved = memory.getInputDevice(nodeId);
      expect(retrieved).toBe(device);
    });

    it('returns undefined if input device is not set', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';

      const retrieved = memory.getInputDevice(nodeId);
      expect(retrieved).toBeUndefined();
    });
  });

  describe('setInputDevice', () => {
    it('sets the input device of a node correctly', () => {
      const memory = new ExecutionMemory();
      const nodeId: NodeId = 'node1';
      const device = vi.fn() as any;

      memory.setInputDevice(nodeId, device);

      const retrieved = memory.getInputDevice(nodeId);
      expect(retrieved).toBe(device);
    });
  });

  describe('getHistory', () => {
    it('returns the correct history messages', () => {
      const memory = new ExecutionMemory();
      const messages = ['message1', 'message2', 'message3'];

      for (const message of messages) {
        memory.pushHistoryMessage(message);
      }

      const retrieved = memory.getHistory();
      expect(retrieved).toEqual(messages);
    });

    it('returns an empty array if no history messages are pushed', () => {
      const memory = new ExecutionMemory();

      const retrieved = memory.getHistory();
      expect(retrieved).toEqual([]);
    });
  });

  describe('pushHistoryMessage', () => {
    it('pushes a history message correctly', () => {
      const memory = new ExecutionMemory();
      const message = 'Test message';

      memory.pushHistoryMessage(message);

      const retrieved = memory.getHistory();
      expect(retrieved).toEqual([message]);
    });
  });

  describe('pushHooks', () => {
    it('pushes hooks correctly', () => {
      const memory = new ExecutionMemory();
      const hooks = ['hook1', 'hook2'];

      memory.pushHooks(hooks);

      expect(memory.hooks).toEqual(hooks);
    });
  });

  describe('pullHooks', () => {
    it('pulls hooks correctly', () => {
      const memory = new ExecutionMemory();
      const hooks = ['hook1', 'hook2'];
      memory.pushHooks(hooks);

      const pulled = memory.pullHooks();

      expect(pulled).toEqual(hooks);
      expect(memory.hooks).toEqual([]);
    });
  });
});