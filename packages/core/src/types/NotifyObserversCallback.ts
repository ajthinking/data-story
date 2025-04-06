import { InputObserver } from './InputObserver';
import { LinkItemsUpdate, LinkItemsUpdateSchema } from './LinkItemsUpdate';
import { z } from 'zod';

export const NotifyObserversCallbackSchema = z.function()
  .args(
    z.array(LinkItemsUpdateSchema) as z.ZodType<LinkItemsUpdate[]>,
    z.optional(z.object({}) as unknown as z.ZodType<InputObserver>),
  ).returns(z.void());

export type NotifyObserversCallback = (
  items: LinkItemsUpdate[],
  inputObserver?: InputObserver
) => void;