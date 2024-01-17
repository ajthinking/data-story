import { ComputerConfig, num, str } from '@data-story/core';
import { Client } from '@hubspot/api-client';
import { EntityPage } from './EntityPage';
import { CrmEntityName } from './CrmEntityName';

const Template: ComputerConfig = {
  name: 'NAME',
  label: 'LABEL',
  inputs: ['input'],
  outputs: ['updated', 'errors'],
  category: 'Hubspot',
  params: [
    str({
      name: 'entity',
      label: 'Entity',
      help: 'The entity to retrieve.',
      value: 'ENTITY',
    }),
    str({
      name: 'properties',
      label: 'Properties',
      help: 'Comma separated list of properties.',
      value: '',
    }),     
    num({
      name: 'limit',
      label: 'Limit',
      help: 'The maximum number of companies to return.',
      value: String('300'),
    }),
  ],
  async *run({ input, output, params }) {
    while(true) {
      const [ incoming ] = input.pull(1)

      // sleep 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      output.push([incoming])

      yield;
    }
  },
}

export const batchUpdate = (name: string) => {
  const { run, ...templateProperties } = Template

  const config = {
    ...structuredClone(templateProperties),
    name: `${name}BatchUpdate`,
    label: `${name}.batchUpdate`,
    run,
  }
  
  const entityParam = config.params!.find((p) => p.name === 'entity')
  entityParam!.inputMode.value = name.toLowerCase()

  return config
}