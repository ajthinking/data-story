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
  count: z.number({
    required_error: 'count is required',
    invalid_type_error: 'count must be a number'
  }),
  linkId: z.string({
    required_error: 'linkId is required',
    invalid_type_error: 'linkId must be a string'
  }),
})

export const NodesStatusSchema = z.object({
  nodeId: z.string({
    required_error: 'nodeId is required',
    invalid_type_error: 'nodeId must be a string'
  }),
  status: z.enum(['BUSY', 'COMPLETE'], {
    required_error: 'status is required',
    invalid_type_error: 'status must be either BUSY or COMPLETE'
  }),
})

export const ObserveLinkItemsSchema = z.object({
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be an array'
  })),
  type: z.literal(RequestObserverType.observeLinkItems, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkItems'
  }),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string'
  }),
  direction: z.enum(['pull', 'push'], {
    required_error: 'direction is required',
    invalid_type_error: 'direction must be either pull or push'
  }).optional(),
  throttleMs: z.number({
    required_error: 'throttleMs is required',
    invalid_type_error: 'throttleMs must be a number'
  }).optional(),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional(),
  onReceive: z.function(),
})

export const ObserveLinkCountsSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkCounts, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkCounts'
  }),
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be a string'
  })),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string'
  }),
  throttleMs: z.number({
    required_error: 'throttleMs is required',
    invalid_type_error: 'throttleMs must be a number'
  }).optional(),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional(),
  onReceive: z.function(),
});

export const ObserveNodeStatusSchema = z.object({
  type: z.literal(RequestObserverType.observeNodeStatus, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeNodeStatus'
  }),
  nodeIds: z.array(z.string({
    required_error: 'nodeIds is required',
    invalid_type_error: 'nodeIds must be a string'
  })),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string'
  }),
  throttleMs: z.number({
    required_error: 'throttleMs is required',
    invalid_type_error: 'throttleMs must be a number'
  }).optional(),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional(),
  onReceive: z.function(),
});

export const ObserveLinkUpdateSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkUpdate, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkUpdate'
  }),
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be a string'
  })),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string'
  }),
  throttleMs: z.number({
    required_error: 'throttleMs is required',
    invalid_type_error: 'throttleMs must be a number'
  }).optional(),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional(),
  limit: z.number({
    required_error: 'limit is required',
    invalid_type_error: 'limit must be a number'
  }).optional(),
  offset: z.number({
    required_error: 'offset is required',
    invalid_type_error: 'offset must be a number'
  }).optional(),
  onReceive: z.function(),
});

export const CancelObservationSchema = z.object({
  type: z.literal(RequestObserverType.cancelObservation, {
    required_error: 'type is required',
    invalid_type_error: 'type must be cancelObservation'
  }),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string'
  }),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional(),
});

export const ExecutionObserverSchema = z.discriminatedUnion('type', [
  ObserveLinkItemsSchema,
  ObserveLinkCountsSchema,
  ObserveLinkUpdateSchema,
  ObserveNodeStatusSchema,
  CancelObservationSchema,
]);