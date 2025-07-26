import { z } from 'zod';

export const EvaluationSchema = z.object({
  type: z.string(),
  label: z.string(),
  shortLabel: z.string(),
  selected: z.boolean().optional(),
});
export type Evaluation = z.infer<typeof EvaluationSchema>;