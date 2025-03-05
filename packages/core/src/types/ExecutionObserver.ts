import { RequestObserverType } from './InputObserveConfig';
import { NotifyObserversCallback, NotifyObserversCallbackSchema } from './NotifyObserversCallback';
import { LinkId } from './Link';
import { NodeId } from './Node';
import { z } from 'zod';

export const LinkCountInfoSchema = z.object({
  count: z.number({
    required_error: 'count is required',
    invalid_type_error: 'count must be a number',
  }),
  linkId: z.string({
    required_error: 'linkId is required',
    invalid_type_error: 'linkId must be a string',
  }) as z.ZodType<LinkId>,
})

export type LinkCountInfo = z.input<typeof LinkCountInfoSchema>;

export const NodesStatusInfoSchema = z.object({
  nodeId: z.string({
    required_error: 'nodeId is required',
    invalid_type_error: 'nodeId must be a string',
  }),
  status: z.enum(['BUSY', 'COMPLETE'], {
    required_error: 'status is required',
    invalid_type_error: 'status must be either BUSY or COMPLETE',
  }),
})

export type NodesStatusInfo = z.input<typeof NodesStatusInfoSchema>;

export const ObserveLinkItemsSchema = z.object({
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be an array',
  }) as z.ZodType<LinkId>),
  type: z.literal(RequestObserverType.observeLinkItems, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkItems',
  }),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string',
  }),
  direction: z.enum(['pull', 'push'], {
    invalid_type_error: 'direction must be either pull or push',
  }).optional(),
  throttleMs: z.number({
    invalid_type_error: 'throttleMs must be a number',
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
  onReceive: NotifyObserversCallbackSchema as z.ZodType<NotifyObserversCallback>,
})

export type ObserveLinkItems = z.input<typeof ObserveLinkItemsSchema>;

export const ObserveLinkCountsSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkCounts, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkCounts',
  }),
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be a string',
  }) as z.ZodType<LinkId>),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string',
  }),
  throttleMs: z.number({
    invalid_type_error: 'throttleMs must be a number',
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
  onReceive: z.function()
    .args(z.object({
      links: z.array(LinkCountInfoSchema),
    }))
    .returns(z.void()),
});

export type ObserveLinkCounts = z.input<typeof ObserveLinkCountsSchema>;

export const ObserveNodeStatusSchema = z.object({
  type: z.literal(RequestObserverType.observeNodeStatus, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeNodeStatus',
  }),
  nodeIds: z.array(z.string({
    required_error: 'nodeIds is required',
    invalid_type_error: 'nodeIds must be a string',
  }).transform(nodeId => nodeId as NodeId)),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string',
  }),
  throttleMs: z.number({
    invalid_type_error: 'throttleMs must be a number',
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
  onReceive: z.function()
    .args(z.object({
      nodes: z.array(NodesStatusInfoSchema),
    }))
    .returns(z.void()),
});

export type ObserveNodeStatus = z.input<typeof ObserveNodeStatusSchema>;

export const ObserveLinkUpdateSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkUpdate, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkUpdate',
  }),
  linkIds: z.array(z.string({
    required_error: 'linkIds is required',
    invalid_type_error: 'linkIds must be a string',
  }) as z.ZodType<LinkId>),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string',
  }),
  throttleMs: z.number({
    invalid_type_error: 'throttleMs must be a number',
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
  limit: z.number({
    invalid_type_error: 'limit must be a number',
  }).optional(),
  offset: z.number({
    invalid_type_error: 'offset must be a number',
  }).optional(),
  onReceive: z.function()
    .args(z.array(
      z.string().transform(linkId => linkId as LinkId).optional(),
    ))
    .returns(z.void()),
});

export type ObserveLinkUpdate = z.input<typeof ObserveLinkUpdateSchema>;

export const CancelObservationSchema = z.object({
  type: z.literal(RequestObserverType.cancelObservation, {
    required_error: 'type is required',
    invalid_type_error: 'type must be cancelObservation',
  }),
  observerId: z.string({
    required_error: 'observerId is required',
    invalid_type_error: 'observerId must be a string',
  }),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
});

export type CancelObservation = z.input<typeof CancelObservationSchema>;

export const ExecutionObserverSchema = z.discriminatedUnion('type', [
  ObserveLinkItemsSchema,
  ObserveLinkCountsSchema,
  ObserveLinkUpdateSchema,
  ObserveNodeStatusSchema,
  CancelObservationSchema,
]);

export type ExecutionObserver = z.input<typeof ExecutionObserverSchema>;

export const AbortRunSchema = z.object({
  executionId: z.string({
    required_error: 'executionId is required',
    invalid_type_error: 'executionId must be a string',
  }),
});

export type AbortRun = z.input<typeof AbortRunSchema>;

export const AbortRunResponseSchema = z.object({
  success: z.boolean(),
  type: z.literal('abortRun'),
  errorMsg: z.string().optional(),
  msgId: z.string().optional(),
});

export type AbortRunResponse = z.input<typeof AbortRunResponseSchema>;