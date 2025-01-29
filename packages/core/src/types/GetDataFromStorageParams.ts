import { ItemValue } from './ItemValue';
import { LinkId } from './Link';
import { z } from 'zod';

export type LinkItems = Record<LinkId, ItemValue[]>

export const LinkItemsSchema = z.record(z.string() as z.ZodType<LinkId>, z.array(z.object({}) as z.ZodType<ItemValue>));

/**
 * @schema GetDataFromStorageParams
 */
export const GetDataFromStorageParamsSchema = z.object({
  type: z.literal('getDataFromStorage', {
    required_error: 'type is required',
    invalid_type_error: 'type must be getDataFromStorage',
  }),
  linkId: z.string({
    required_error: 'linkId is required',
    invalid_type_error: 'linkId must be a string',
  }) as z.ZodType<LinkId>,
  msgId: z.string({
    invalid_type_error: 'msgId must be a string',
  }).optional(),
  offset: z.number({
    invalid_type_error: 'offset must be a number',
  }).optional(),
  limit: z.number({
    invalid_type_error: 'limit must be a number',
  }).optional(),
});

export type GetDataFromStorageParams = z.input<typeof GetDataFromStorageParamsSchema>;

export const GetDataFromStorageResponseSchema = GetDataFromStorageParamsSchema.extend({
  data: LinkItemsSchema,
});

export type GetDataFromStorageResponse = z.input<typeof GetDataFromStorageResponseSchema>;