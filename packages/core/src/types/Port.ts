import { z } from 'zod';

export const PortNameSchema = z.string();
export type PortName = z.infer<typeof PortNameSchema>;

export const AbstractPortSchema = z.object({
  name: PortNameSchema,
  schema: z.record(z.any()),
});
export type AbstractPort = z.infer<typeof AbstractPortSchema>;

export const PortSchema = z.object({
  id: z.string(),
  name: PortNameSchema,
  schema: z.record(z.any()),
});
export type Port = z.infer<typeof PortSchema>;