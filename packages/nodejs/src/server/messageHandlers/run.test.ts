import { describe, it, expect, vi } from 'vitest';
import { run } from './run';
import WebSocket from 'ws';

// Mock WebSocket
const mockWebSocket = {
  send: vi.fn(),
  readyState: WebSocket.OPEN,
} as any;

// Mock MessageHandlerParams
const mockParams = {
  ws: mockWebSocket,
  observerController: {} as any,
  app: {
    getExecutor: vi.fn(() => ({
      execute: vi.fn(async function* () {
        // Mock execution generator
        yield { type: 'test' };
      }),
    })),
  } as any,
};

describe('run message handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates and processes a valid run message', async () => {
    const validData = {
      msgId: 'test-msg-1',
      type: 'run' as const,
      diagram: {
        nodes: [],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      },
      executionId: 'exec-1',
    };

    await run({
      ...mockParams,
      data: validData,
    });

    // Should not send any error messages
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"ExecutionResult"')
    );
  });

  it('rejects invalid run message and sends error', async () => {
    const invalidData = {
      msgId: 'test-msg-1',
      type: 'run' as const,
      diagram: {
        nodes: [],
        links: [],
        params: [],
        // missing viewport
      },
      executionId: 'exec-1',
    };

    await run({
      ...mockParams,
      data: invalidData as any,
    });

    // Should send validation error
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"ExecutionFailure"')
    );
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      expect.stringContaining('Invalid run message')
    );
  });

  it('rejects message with wrong type', async () => {
    const invalidData = {
      msgId: 'test-msg-1',
      type: 'execute', // wrong type
      diagram: {
        nodes: [],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      },
      executionId: 'exec-1',
    };

    await run({
      ...mockParams,
      data: invalidData as any,
    });

    // Should send validation error
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      expect.stringContaining('"type":"ExecutionFailure"')
    );
  });

  it('handles validation error when WebSocket is closed', async () => {
    const closedWebSocket = {
      ...mockWebSocket,
      readyState: WebSocket.CLOSED,
    };

    const invalidData = {
      msgId: 'test-msg-1',
      type: 'execute', // wrong type
      diagram: {
        nodes: [],
        links: [],
        params: [],
        viewport: { x: 0, y: 0, zoom: 1 },
      },
      executionId: 'exec-1',
    };

    await run({
      ...mockParams,
      ws: closedWebSocket,
      data: invalidData as any,
    });

    // Should not try to send when WebSocket is closed
    expect(closedWebSocket.send).not.toHaveBeenCalled();
  });

  it('handles missing msgId in invalid data', async () => {
    const invalidData = {
      // msgId is missing
      type: 'run' as const,
      diagram: {
        nodes: [],
        links: [],
        params: [],
        // missing viewport
      },
      executionId: 'exec-1',
    };

    await run({
      ...mockParams,
      data: invalidData as any,
    });

    // Should send validation error with 'unknown' msgId
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      expect.stringContaining('"msgId":"unknown"')
    );
  });
});