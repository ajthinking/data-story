import { z } from 'zod';

export const CastSchema = z.object({
  type: z.string(),
  label: z.string(),
  shortLabel: z.string(),
  selected: z.boolean().optional(),
});
export type Cast = z.infer<typeof CastSchema>;