import { z } from 'zod';
import { RequestObserverType } from './InputObserveConfig';
import { ItemValue } from './ItemValue';

export const LinkItemsParamSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkItems),
  linkId: z.string(),
  items: z.array(z.object({}) as z.ZodType<ItemValue>),
});

export type LinkItemsParam = z.input<typeof LinkItemsParamSchema>;