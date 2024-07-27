import { Computer, num, str } from '@data-story/core';
import { Client } from '@hubspot/api-client';
import { EntityPage } from './EntityPage';
import { CrmEntityName } from './CrmEntityName';

const Template: Computer = {
  name: 'NAME',
  label: 'LABEL',
  inputs: [{
    name: 'incoming',
    schema: {},
  }],
  outputs: [
    {
      name: 'updated',
      schema: {},
    },
    {
      name: 'errors',
      schema: {},
    }
  ],
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

export const batchArchive = (name: string) => {
  const { run, ...templateProperties } = Template

  const config = {
    ...structuredClone(templateProperties),
    name: `${name}BatchArchive`,
    label: `${name}.batchArchive`,
    run,
  }

  const entityParam = config.params!.find((p) => p.name === 'entity')
  entityParam!.value = name.toLowerCase()

  return config
}