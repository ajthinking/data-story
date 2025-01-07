import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback } from './NotifyObserversCallback';
import { LinkId } from './Link';
import { NodeStatus } from '../Executor';
import { NodeId } from './Node';
import { z } from 'zod';

export type ObserveLinkItems = {
  type: RequestObserverType.observeLinkItems,
  linkIds: string[],
  onReceive: NotifyObserversCallback,
  observerId: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
  throttleMs?: number,
  msgId?: string;
}

export interface LinkCountInfo {
  count: number;
  linkId: string;
}

export type ObserveLinkCounts = {
  type: RequestObserverType.observeLinkCounts,
  linkIds: string[],
  observerId: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (params: {
    links: LinkCountInfo[],
  }) => void,
}

export type NodesStatus = {nodeId: NodeId, status: Omit<NodeStatus, 'AVAILABLE'>}

export type ObserveNodeStatus = {
  type: RequestObserverType.observeNodeStatus,
  nodeIds: NodeId[],
  observerId: string,
  throttleMs?: number,
  msgId?: string,
  onReceive: (data: {
    nodes: NodesStatus[],
  }) => void,
}

export type ObserveLinkUpdate = {
  type: RequestObserverType.observeLinkUpdate,
  linkIds: string[],
  observerId: string,
  onReceive: (linkIds: LinkId[]) => void,
  throttleMs?: number,
  msgId?: string,
  limit?: number,
  offset?: number,
}

export type CancelObservation = {
  type: RequestObserverType.cancelObservation,
  observerId: string,
  msgId?: string
}

export type ExecutionObserver = ObserveLinkItems | ObserveLinkCounts | CancelObservation | ObserveLinkUpdate | ObserveNodeStatus;

export const LinkCountInfoSchema = z.object({
  count: z.number(),
  linkId: z.string(),
})

export const NodesStatusSchema = z.object({
  nodeId: z.string(),
  status: z.enum(['BUSY', 'COMPLETE']),
})

export const ObserveLinkItemsSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkItems),
  linkIds: z.array(z.string()),
  observerId: z.string(),
  direction: z.enum(['pull', 'push']).optional(),
  onlyFirstNItems: z.number().optional(),
  throttleMs: z.number().optional(),
  msgId: z.string().optional(),
  onReceive: z.function(),
})

export const ObserveLinkCountsSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkCounts),
  linkIds: z.array(z.string()),
  observerId: z.string(),
  throttleMs: z.number().optional(),
  msgId: z.string().optional(),
  onReceive: z.function(),
});

export const ObserveNodeStatusSchema = z.object({
  type: z.literal(RequestObserverType.observeNodeStatus),
  nodeIds: z.array(z.string()),
  observerId: z.string(),
  throttleMs: z.number().optional(),
  msgId: z.string().optional(),
  onReceive: z.function(),
});

export const ObserveLinkUpdateSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkUpdate),
  linkIds: z.array(z.string()),
  observerId: z.string(),
  throttleMs: z.number().optional(),
  msgId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  onReceive: z.function(),
});

export const CancelObservationSchema = z.object({
  type: z.literal(RequestObserverType.cancelObservation),
  observerId: z.string(),
  msgId: z.string().optional(),
});

export const ExecutionObserverSchema = z.discriminatedUnion('type', [
  ObserveLinkItemsSchema,
  ObserveLinkCountsSchema,
  ObserveLinkUpdateSchema,
  ObserveNodeStatusSchema,
  CancelObservationSchema,
]);