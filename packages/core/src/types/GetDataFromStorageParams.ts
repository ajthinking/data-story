import { ItemValue } from './ItemValue';
import { LinkId } from './Link';
import { z } from 'zod';

export type LinkItems = Record<LinkId, ItemValue[]>

export const LinkItemsSchema = z.record(z.array(z.any()));

export type GetDataFromStorageParams = {
  type: 'getDataFromStorage',
  linkId: LinkId,
  msgId?: string,
  offset?: number,
  limit?: number,
}

/**
 * @schema GetDataFromStorageParams
 */
export const GetDataFromStorageParamsSchema = z.object({
  type: z.literal('getDataFromStorage'),
  linkId: z.string(),
  msgId: z.string().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export type GetDataFromStorageResponse = GetDataFromStorageParams & { data: LinkItems }

export const GetDataFromStorageResponseSchema = GetDataFromStorageParamsSchema.extend({
  data: LinkItemsSchema,
});