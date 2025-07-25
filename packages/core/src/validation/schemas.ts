import { z } from 'zod';
import { NodeId } from '../types/Node';
import { LinkId } from '../types/Link';
import { PortId } from '../types/PortId';
import { PortName } from '../types/Port';
import { ParamName } from '../Param/Param';

// Port schemas
export const PortSchema = z.object({
  id: z.string() as z.ZodType<PortId>,
  name: z.string() as z.ZodType<PortName>,
  schema: z.record(z.any()),
});

export const AbstractPortSchema = z.object({
  name: z.string() as z.ZodType<PortName>,
  schema: z.record(z.any()),
});

// Param schemas
export const StringableInputValueSchema = z.object({
  rawValue: z.string(),
  Evaluation: z.string().optional(),
  Cast: z.string().optional(),
});

export const StringableParamSchema = z.object({
  name: z.string() as z.ZodType<ParamName>,
  label: z.string(),
  help: z.string(),
  type: z.literal('StringableParam'),
  multiline: z.boolean(),
  canInterpolate: z.boolean(),
  interpolate: z.boolean().optional(),
  interpolationsFromPort: z.array(z.string() as z.ZodType<PortName>).optional(),
  casts: z.array(z.any()).optional(),
  evaluations: z.array(z.any()).optional(),
  input: StringableInputValueSchema,
});

export const ParamSchema = StringableParamSchema;

// Node schema
export const NodeSchema = z.object({
  id: z.string() as z.ZodType<NodeId>,
  type: z.string(),
  label: z.string().optional(),
  inputs: z.array(PortSchema),
  outputs: z.array(PortSchema),
  params: z.array(ParamSchema),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
});

// Link schema
export const LinkSchema = z.object({
  id: z.string() as z.ZodType<LinkId>,
  sourcePortId: z.string() as z.ZodType<PortId>,
  targetPortId: z.string() as z.ZodType<PortId>,
  label: z.union([z.string(), z.any()]).optional(), // ReactNode can be any
  labelBgStyle: z.record(z.any()).optional(), // CSSProperties
});

// SerializedDiagram schema - for plain data without methods
export const SerializedDiagramSchema = z.object({
  nodes: z.array(NodeSchema),
  links: z.array(LinkSchema),
  params: z.array(ParamSchema),
  viewport: z.object({
    x: z.number(),
    y: z.number(),
    zoom: z.number(),
  }),
});

// RunMessage schema
export const RunMessageSchema = z.object({
  msgId: z.string(),
  type: z.literal('run'),
  diagram: SerializedDiagramSchema,
  executionId: z.string(),
});

// Type exports
export type SerializedDiagram = z.input<typeof SerializedDiagramSchema>;
export type RunMessage = z.input<typeof RunMessageSchema>;