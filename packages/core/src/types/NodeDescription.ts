import { z } from 'zod';
import { Param, ParamSchema } from '../Param';
import { AbstractPort, AbstractPortSchema } from './Port';
import { ComputerType, ComputerTypeSchema } from '../types/Computer';

export const NodeDescriptionSchema = z.object({
  type: z.literal('NodeDescription'),
  computerType: ComputerTypeSchema,
  label: z.string().optional(),
  category: z.string().optional(),
  inputs: z.array(AbstractPortSchema),
  outputs: z.array(AbstractPortSchema),
  params: z.array(ParamSchema),
});
export type NodeDescription = z.infer<typeof NodeDescriptionSchema>;

/**
 * @schema NodeDescriptionResponse
 */
export const NodeDescriptionResponseSchema = z.object({
  availableNodes: z.array(z.object({}) as unknown as z.ZodType<NodeDescription>, {
    required_error: 'availableNodes is required',
    invalid_type_error: 'availableNodes must be an array',
  }),
  msgId: z.string({
    required_error: 'msgId is required',
    invalid_type_error: 'msgId must be a string',
  }),
  path: z.string({
    invalid_type_error: 'path must be a string',
  }).optional(),
  status: z.literal('server-post', {
    invalid_type_error: 'status must be server-post',
  }).optional(),
  type: z.literal('getNodeDescriptions', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getNodeDescriptions',
  }),
});

export type NodeDescriptionResponse = z.input<typeof NodeDescriptionResponseSchema>;

/**
 * @schema NodeDescriptionRequest
 */
export const NodeDescriptionRequestSchema = z.object({
  type: z.literal('getNodeDescriptions', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getNodeDescriptions',
  }),
  path: z.string({
    invalid_type_error: 'path must be a string',
  }).optional(),
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
});

export type NodeDescriptionRequest = z.input<typeof NodeDescriptionRequestSchema>;