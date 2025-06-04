import { Computer, num, str } from '@data-story/core';
import { Client } from '@hubspot/api-client';
import { EntityPage } from './EntityPage';
import { CrmEntityName } from './CrmEntityName';

const Template: Computer = {
  name: 'NAME',
  label: 'LABEL',
  inputs: [],
  outputs: [
    {
      name: 'all',
      schema: {},
    },
    {
      name: 'errors',
      schema: {},
    },
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
  async *run({ output, params }) {
    const hubspot = new Client({
      accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
      numberOfApiCallRetries: 3,
    })

    let taken = 0

    const limit = params.limit
      ? Number(params.limit)
      : Infinity
    const entity = params.entity as CrmEntityName
    const properties: string[] = (params.properties as string)
      .split(',')
      .map((p) => p.trim())
    let nextPage = null;

    do {
      // Make the API call to get a page of results
      try {
        let page: EntityPage = await hubspot.crm[entity].basicApi.getPage(
          100,
          nextPage?.after,
          properties,
        );

        // Output the results
        taken += page.results.length
        output.pushTo('all', page.results);

        // Check if there is a next page of results
        nextPage = page.paging?.next;
      } catch(e: any) {
        console.log(e)
        output.pushTo('errors', [{
          message: e.message,
        }])

        return
      }

      yield;
    } while (nextPage && taken < limit);

    yield;
  },
}

export const getAll = (name: string) => {
  const { run, ...templateProperties } = Template

  const config = {
    ...structuredClone(templateProperties),
    name,
    label: name,
    run,
  }

  const entityParam = config.params!.find((p) => p.name === 'entity')
  entityParam!.input.rawValue = name.toLowerCase()

  return config
}