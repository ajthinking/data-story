import { describe, it, expect } from 'vitest';
import { RunMessageSchema, SerializedDiagramSchema } from '../validation/schemas';
import { Diagram } from '../Diagram';

describe('Integration: Diagram validation', () => {
  it('validates a Diagram class instance can be serialized and validated', () => {
    // Create a real Diagram instance (hydrated with methods)
    const diagram = new Diagram({
      nodes: [
        {
          id: 'input-1',
          type: 'Input',
          inputs: [],
          outputs: [
            { id: 'output-port-1', name: 'output', schema: {} }
          ],
          params: [],
          position: { x: 100, y: 100 }
        },
        {
          id: 'output-1', 
          type: 'Output',
          inputs: [
            { id: 'input-port-1', name: 'input', schema: {} }
          ],
          outputs: [],
          params: [],
          position: { x: 300, y: 100 }
        }
      ],
      links: [
        {
          id: 'link-1',
          sourcePortId: 'output-port-1',
          targetPortId: 'input-port-1'
        }
      ],
      params: [],
      viewport: { x: 0, y: 0, zoom: 1 }
    });

    // Verify the diagram has methods (is hydrated)
    expect(typeof diagram.clone).toBe('function');
    expect(typeof diagram.add).toBe('function');
    expect(typeof diagram.connect).toBe('function');

    // Serialize the diagram to plain data (non-hydrated)
    const serializedDiagram = {
      nodes: diagram.nodes,
      links: diagram.links,
      params: diagram.params,
      viewport: diagram.viewport
    };

    // Validate the serialized diagram
    expect(() => SerializedDiagramSchema.parse(serializedDiagram)).not.toThrow();

    // Create a valid RunMessage using the serialized diagram
    const runMessage = {
      msgId: 'test-run-msg',
      type: 'run' as const,
      diagram: serializedDiagram,
      executionId: 'test-execution-id'
    };

    // Validate the complete RunMessage
    expect(() => RunMessageSchema.parse(runMessage)).not.toThrow();
    
    const validated = RunMessageSchema.parse(runMessage);
    
    // Verify the validated data structure
    expect(validated.msgId).toBe('test-run-msg');
    expect(validated.type).toBe('run');
    expect(validated.executionId).toBe('test-execution-id');
    expect(validated.diagram.nodes).toHaveLength(2);
    expect(validated.diagram.links).toHaveLength(1);
    expect(validated.diagram.viewport).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  it('demonstrates the difference between hydrated and serialized diagrams', () => {
    // Hydrated diagram (has methods)
    const hydratedDiagram = new Diagram({
      nodes: [],
      links: [],
      params: [],
      viewport: { x: 0, y: 0, zoom: 1 }
    });

    // Actually, the schema is flexible enough to validate Diagram instances
    // since it only checks for required properties, not extra ones
    expect(() => SerializedDiagramSchema.parse(hydratedDiagram)).not.toThrow();

    // The key benefit is having a dedicated SerializedDiagram type for non-hydrated data
    const serializedDiagram = {
      nodes: hydratedDiagram.nodes,
      links: hydratedDiagram.links,
      params: hydratedDiagram.params,
      viewport: hydratedDiagram.viewport
    };

    expect(() => SerializedDiagramSchema.parse(serializedDiagram)).not.toThrow();
    
    // The type system ensures we work with plain data in RunMessage
    const runMessage = {
      msgId: 'test',
      type: 'run' as const,
      diagram: serializedDiagram, // This is SerializedDiagram type, not Diagram class
      executionId: 'test'
    };
    
    expect(() => RunMessageSchema.parse(runMessage)).not.toThrow();
  });

  it('validates complex diagram with params', () => {
    const complexDiagram = {
      nodes: [
        {
          id: 'node-with-params',
          type: 'CustomNode',
          inputs: [
            { id: 'in-1', name: 'input', schema: { type: 'object' } }
          ],
          outputs: [
            { id: 'out-1', name: 'output', schema: { type: 'array' } }
          ],
          params: [
            {
              name: 'testParam',
              label: 'Test Parameter',
              help: 'This is a test parameter',
              type: 'StringableParam' as const,
              multiline: false,
              canInterpolate: true,
              interpolate: true,
              input: {
                rawValue: 'default value',
                Cast: 'string'
              }
            }
          ],
          position: { x: 200, y: 150 }
        }
      ],
      links: [],
      params: [
        {
          name: 'globalParam',
          label: 'Global Parameter',
          help: 'A global parameter',
          type: 'StringableParam' as const,
          multiline: true,
          canInterpolate: false,
          input: {
            rawValue: 'global value'
          }
        }
      ],
      viewport: { x: -50, y: -25, zoom: 1.5 }
    };

    expect(() => SerializedDiagramSchema.parse(complexDiagram)).not.toThrow();

    const runMessage = {
      msgId: 'complex-run-msg',
      type: 'run' as const,
      diagram: complexDiagram,
      executionId: 'complex-execution'
    };

    expect(() => RunMessageSchema.parse(runMessage)).not.toThrow();
  });

  it('rejects invalid diagram structures', () => {
    const invalidDiagrams = [
      // Missing required viewport
      {
        nodes: [],
        links: [],
        params: []
      },
      // Invalid node structure
      {
        nodes: [
          {
            id: 'invalid-node',
            // missing type
            inputs: [],
            outputs: [],
            params: []
          }
        ],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      },
      // Invalid link structure
      {
        nodes: [],
        links: [
          {
            id: 'invalid-link',
            sourcePortId: 'port-1'
            // missing targetPortId
          }
        ],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 }
      }
    ];

    invalidDiagrams.forEach((invalidDiagram, index) => {
      expect(() => SerializedDiagramSchema.parse(invalidDiagram), 
        `Invalid diagram ${index} should fail validation`).toThrow();
    });
  });
});