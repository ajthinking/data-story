import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getDiagram } from './getDiagram';
import { Diagram } from '@data-story/core';
import fs from 'fs/promises';
import { MessageHandlerParams } from '../MessageHandler';

vi.mock('fs/promises');

describe('getDiagram', () => {
  const mockWs = {
    send: vi.fn(),
  };

  (fs.readFile as any).mockResolvedValue(undefined);

  const mockData = {
    type: 'getDiagram',
    msgId: 'test-msg-id',
  };

  const mockDiagram = {
    nodes: [{ id: 'node1', type: 'test' }],
    links: [{ id: 'link1', source: 'node1', target: 'node2' }],
  };
  const createMockParams = (data: any) => ({
    ws: mockWs,
    data,
  } as unknown as MessageHandlerParams<any>);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return a new Diagram when diagramId is not provided', async () => {
    await getDiagram(createMockParams(mockData));

    expect(fs.readFile).not.toHaveBeenCalled();
    expect(mockWs.send).toHaveBeenCalledTimes(1);

    const sentData = JSON.parse(mockWs.send.mock.calls[0][0]);
    expect(sentData.type).toBe('getDiagram');
    expect(sentData.msgId).toBe('test-msg-id');
    expect(sentData.diagram).toBeDefined();
    expect(sentData.diagram.nodes).toEqual([]);
    expect(sentData.diagram.links).toEqual([]);
  });

  it('should return a diagram from file when diagramId is provided and file exists', async () => {
    (fs.readFile as any).mockResolvedValueOnce(JSON.stringify(mockDiagram));
    await getDiagram(createMockParams({ ...mockData, diagramId: 'test-diagram.json' }));

    expect(fs.readFile).toHaveBeenCalledWith('test-diagram.json', 'utf-8');
    expect(mockWs.send).toHaveBeenCalledTimes(1);

    const sentData = JSON.parse(mockWs.send.mock.calls[0][0]);
    expect(sentData.type).toBe('getDiagram');
    expect(sentData.msgId).toBe('test-msg-id');
    expect(sentData.diagram).toEqual(mockDiagram);
  });

  it('should return a new Diagram when diagramData is undefined', async () => {
    (fs.readFile as any).mockResolvedValueOnce(undefined);
    await getDiagram(createMockParams({ ...mockData, diagramId: 'test-diagram.json' }));

    expect(fs.readFile).toHaveBeenCalled();
    expect(mockWs.send).toHaveBeenCalledTimes(1);

    const sentData = JSON.parse(mockWs.send.mock.calls[0][0]);
    expect(sentData.type).toBe('getDiagram');
    expect(sentData.msgId).toBe('test-msg-id');
    expect(sentData.diagram).toBeDefined();
    expect(sentData.diagram.nodes).toEqual([]);
    expect(sentData.diagram.links).toEqual([]);
  });

  it('should return a new Diagram when file reading throws an error', async () => {
    (fs.readFile as any).mockRejectedValueOnce(new Error('File not found'));
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    await getDiagram(createMockParams({ ...mockData, diagramId: 'test-diagram.json' }));

    expect(fs.readFile).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error reading diagram file:', expect.any(Error));
    expect(mockWs.send).toHaveBeenCalledTimes(1);

    const sentData = JSON.parse(mockWs.send.mock.calls[0][0]);
    expect(sentData.type).toBe('getDiagram');
    expect(sentData.msgId).toBe('test-msg-id');
    expect(sentData.diagram).toBeDefined();
    expect(sentData.diagram.nodes).toEqual([]);
    expect(sentData.diagram.links).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it('should handle empty file content correctly', async () => {
    (fs.readFile as any).mockResolvedValueOnce('');
    await getDiagram(createMockParams({ ...mockData, diagramId: 'test-diagram.json' }));

    expect(fs.readFile).toHaveBeenCalled();
    expect(mockWs.send).toHaveBeenCalledTimes(1);

    const sentData = JSON.parse(mockWs.send.mock.calls[0][0]);
    expect(sentData.type).toBe('getDiagram');
    expect(sentData.msgId).toBe('test-msg-id');
    expect(sentData.diagram).toBeDefined();
    expect(sentData.diagram.nodes).toEqual([]);
    expect(sentData.diagram.links).toEqual([]);
  });
});
