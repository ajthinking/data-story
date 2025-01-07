import { z } from 'zod';

export const validateZodSchema = <T>(schema: z.ZodSchema<T>, data: unknown): void => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(data, `should be of type ${schema.description}`);
  }
};
