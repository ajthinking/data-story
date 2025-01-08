import { z } from 'zod';

export const validateZodSchema = <T>(schema: z.ZodSchema<T>, data: unknown): void => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error('the schema error is', result.error);
    console.error('the original data is', data);
  }
};
