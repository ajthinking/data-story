import { InputObserver } from './InputObserver';
import { LinkItemsParam, LinkItemsParamSchema } from './LinkItemsParam';
import { z } from 'zod';

export const NotifyObserversCallbackSchema = z.function()
  .args(z.array(LinkItemsParamSchema) as z.ZodType<LinkItemsParam[]>, (z.object({}) as unknown as z.ZodType<InputObserver>).optional())
  .returns(z.void());

export type NotifyObserversCallback = z.input<typeof NotifyObserversCallbackSchema>;