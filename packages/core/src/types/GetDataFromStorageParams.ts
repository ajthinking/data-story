import { ItemValue } from './ItemValue';
import { LinkId } from './Link';
import { z } from 'zod';

export type LinkItems = Record<LinkId, ItemValue[]>

export const LinkItemsSchema = z.record(z.string() as z.ZodType<LinkId>, z.array(z.object({}) as z.ZodType<ItemValue>));

/**
 * @schema GetDataFromStorageParams
 */
export const GetDataFromStorageParamsSchema = z.object({
  type: z.literal('getDataFromStorage'),
  linkId: z.string() as z.ZodType<LinkId>,
  msgId: z.string().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export type GetDataFromStorageParams = z.input<typeof GetDataFromStorageParamsSchema>;

export const GetDataFromStorageResponseSchema = GetDataFromStorageParamsSchema.extend({
  data: LinkItemsSchema,
});

export type GetDataFromStorageResponse = z.input<typeof GetDataFromStorageResponseSchema>;