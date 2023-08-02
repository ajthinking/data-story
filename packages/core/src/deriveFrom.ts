import { DefaultParams, ParamValue } from './Param';
import { ComputerConfig } from './types/ComputerConfig';
import { ComputerFactory } from './ComputerFactory';

export type DeriveFromOptions = {
  name: string,
  label?: string,
  category?: string,
  params: Record<string, ParamValue>,
  tags?: string[],
}

// TODO is this duplicating ComputerFactory?
export const deriveFrom = (
  computerConfig: ComputerConfig,
  options: Record<string, ParamValue>
) => {
  const template = ComputerFactory.get(computerConfig);
  template.name = options.name;

  template.tags = [
    ...(template.tags || []),
    ...(options.tags || []),
  ]

  template.category = options.category || template.category
  template.label = options.label || template.label

  if(!template.params) template.params = {}
    
  template.params = { ...DefaultParams, ...template.params }

  for (const [paramName, paramValue] of Object.entries(options.params || {})) {
    template.params[paramName].value = paramValue
  }

  return template
}