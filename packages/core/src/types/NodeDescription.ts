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
  availableNodes: z.array(z.object({}), {
    required_error: 'availableNodes is required',
    invalid_type_error: 'availableNodes must be an array'
  }),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }),
  path: z.string({
    required_error: 'path is required',
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

export interface NodeDescriptionResponse {
  availableNodes: NodeDescription[];
  msgId: string;
  path?: string;
  status: 'server-post';
  type: 'getNodeDescriptions';
}

/**
 * @schema NodeDescriptionRequest
 */
export const NodeDescriptionRequestSchema = z.object({
  type: z.literal('getNodeDescriptions', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getNodeDescriptions'
  }),
  path: z.string({
    required_error: 'path is required',
    invalid_type_error: 'path must be a string'
  }).optional(),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string'
  }).optional()
});

export interface NodeDescriptionRequest {
  type: 'getNodeDescriptions';
  path?: string;
  msgId?: string;
}