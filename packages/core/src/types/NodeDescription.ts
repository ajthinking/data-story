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
  availableNodes: z.array(z.object({})),
  msgId: z.string(),
  path: z.string().optional(),
  status: z.literal('server-post'),
  type: z.literal('getNodeDescriptions'),
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
  type: z.literal('getNodeDescriptions'),
  path: z.string().optional(),
  msgId: z.string().optional() });

export interface NodeDescriptionRequest {
  type: 'getNodeDescriptions';
  path?: string;
  msgId?: string;
}