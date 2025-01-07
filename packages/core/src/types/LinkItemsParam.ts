import { z } from 'zod';
import { RequestObserverType } from './InputObserveConfig';
import { ItemValue } from './ItemValue';

export type LinkItemsParam = {
  type: RequestObserverType.observeLinkItems;
  linkId: string;
  items: ItemValue[];
}

export const LinkItemsParamSchema = z.object({
  type: z.literal(RequestObserverType.observeLinkItems),
  linkId: z.string(),
  items: z.array(z.object({})),
});