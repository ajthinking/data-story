import { describe, it, expect } from 'vitest';
import { 
  NodeSchema, 
  LinkSchema, 
  SerializedDiagramSchema, 
  RunMessageSchema,
  SerializedDiagram 
} from './schemas';
import { Diagram } from '../Diagram';

describe('validation schemas', () => {
  describe('NodeSchema', () => {
    it('validates a valid node', () => {
      const validNode = {
        id: 'node-1',
        type: 'TestNode',
        label: 'Test Node',
        inputs: [
          { id: 'input-1', name: 'input', schema: {} }
        ],
        outputs: [
          { id: 'output-1', name: 'output', schema: {} }
        ],
        params: [],
        position: { x: 100, y: 200 }
      };

      expect(() => NodeSchema.parse(validNode)).not.toThrow();
    });

    it('validates a minimal valid node', () => {
      const minimalNode = {
        id: 'node-1',
        type: 'TestNode',
        inputs: [],
        outputs: [],
        params: []
      };

      expect(() => NodeSchema.parse(minimalNode)).not.toThrow();
    });

    it('rejects invalid node without id', () => {
      const invalidNode = {
        type: 'TestNode',
        inputs: [],
        outputs: [],
        params: []
      };

      expect(() => NodeSchema.parse(invalidNode)).toThrow();
    });
  });

  describe('LinkSchema', () => {
    it('validates a valid link', () => {
      const validLink = {
        id: 'link-1',
        sourcePortId: 'port-1',
        targetPortId: 'port-2',
        label: 'Test Link'
      };

      expect(() => LinkSchema.parse(validLink)).not.toThrow();
    });

    it('validates a minimal valid link', () => {
      const minimalLink = {
        id: 'link-1',
        sourcePortId: 'port-1',
        targetPortId: 'port-2'
      };

      expect(() => LinkSchema.parse(minimalLink)).not.toThrow();
    });

    it('rejects invalid link without required fields', () => {
      const invalidLink = {
        id: 'link-1',
        sourcePortId: 'port-1'
        // missing targetPortId
      };

      expect(() => LinkSchema.parse(invalidLink)).toThrow();
    });
  });

  describe('SerializedDiagramSchema', () => {
    it('validates a valid serialized diagram', () => {
      const validDiagram = {
        nodes: [
          {
            id: 'node-1',
            type: 'TestNode',
            inputs: [],
            outputs: [],
            params: []
          }
        ],
        links: [
          {
            id: 'link-1',
            sourcePortId: 'port-1',
            targetPortId: 'port-2'
          }
        ],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      };

      expect(() => SerializedDiagramSchema.parse(validDiagram)).not.toThrow();
    });

    it('validates an empty diagram', () => {
      const emptyDiagram = {
        nodes: [],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      };

      expect(() => SerializedDiagramSchema.parse(emptyDiagram)).not.toThrow();
    });

    it('rejects diagram without viewport', () => {
      const invalidDiagram = {
        nodes: [],
        links: [],
        params: []
        // missing viewport
      };

      expect(() => SerializedDiagramSchema.parse(invalidDiagram)).toThrow();
    });
  });

  describe('RunMessageSchema', () => {
    it('validates a valid run message', () => {
      const validMessage = {
        msgId: 'msg-1',
        type: 'run' as const,
        diagram: {
          nodes: [],
          links: [],
          params: [],
          viewport: { x: 0, y: 0, zoom: 1 }
        },
        executionId: 'exec-1'
      };

      expect(() => RunMessageSchema.parse(validMessage)).not.toThrow();
    });

    it('rejects message with wrong type', () => {
      const invalidMessage = {
        msgId: 'msg-1',
        type: 'execute', // wrong type
        diagram: {
          nodes: [],
          links: [],
          params: [],
          viewport: { x: 0, y: 0, zoom: 1 }
        },
        executionId: 'exec-1'
      };

      expect(() => RunMessageSchema.parse(invalidMessage)).toThrow();
    });

    it('rejects message without required fields', () => {
      const invalidMessage = {
        msgId: 'msg-1',
        type: 'run' as const,
        diagram: {
          nodes: [],
          links: [],
          params: [],
          viewport: { x: 0, y: 0, zoom: 1 }
        }
        // missing executionId
      };

      expect(() => RunMessageSchema.parse(invalidMessage)).toThrow();
    });
  });

  describe('SerializedDiagram type compatibility', () => {
    it('works with Diagram class serialization', () => {
      const diagram = new Diagram({
        nodes: [],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      });

      // This should be serializable to SerializedDiagram
      const serialized: SerializedDiagram = {
        nodes: diagram.nodes,
        links: diagram.links,
        params: diagram.params,
        viewport: diagram.viewport
      };

      expect(() => SerializedDiagramSchema.parse(serialized)).not.toThrow();
    });
  });
});