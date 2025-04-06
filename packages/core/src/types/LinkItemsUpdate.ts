import { z } from 'zod';
import { RequestObserverType } from './InputObserveConfig';
import { ItemValue } from './ItemValue';

export const LinkItemsUpdateSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkItems, {
    required_error: 'type is required',
    invalid_type_error: 'type must be observeLinkItems',
  }),
  linkId: z.string({
    required_error: 'linkId is required',
    invalid_type_error: 'linkId must be a string',
  }) as z.ZodType<string>,
  items: z.array(z.object({}) as z.ZodType<ItemValue>),
});

export type LinkItemsUpdate = z.input<typeof LinkItemsUpdateSchema>;