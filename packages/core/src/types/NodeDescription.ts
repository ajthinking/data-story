import { z } from 'zod';
import { Param } from '../Param';
import { AbstractPort } from './Port';

export type NodeDescription = {
  name: string,
  label?: string,
  category?: string,
  inputs: AbstractPort[],
  outputs: AbstractPort[],
  params: Param[],
}

/**
 * @schema NodeDescriptionResponse
 */
export const NodeDescriptionResponseSchema = z.object({
  availableNodes: z.array(z.object({}) as unknown as z.ZodType<NodeDescription>, {
    required_error: 'availableNodes is required',
    invalid_type_error: 'availableNodes must be an array'
  }),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }),
  path: z.string({
    invalid_type_error: 'path must be a string'
  }).optional(),
  status: z.literal('server-post', {
    required_error: 'status is required',
    invalid_type_error: 'status must be server-post'
  }),
  type: z.literal('getNodeDescriptions', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getNodeDescriptions'
  }),
});

export type NodeDescriptionResponse = z.input<typeof NodeDescriptionResponseSchema>;

/**
 * @schema NodeDescriptionRequest
 */
export const NodeDescriptionRequestSchema = z.object({
  type: z.literal('getNodeDescriptions', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getNodeDescriptions'
  }),
  path: z.string({
    invalid_type_error: 'path must be a string'
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string'
  }).optional()
});

export type NodeDescriptionRequest = z.input<typeof NodeDescriptionRequestSchema>;