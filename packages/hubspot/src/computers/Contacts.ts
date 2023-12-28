import { ComputerConfig, num, str } from '@data-story/core';
import { Client } from '@hubspot/api-client';
import { EntityPage } from '../types/EntityPage';
import { CrmEntity } from '../types/CrmEntity';

export const Contacts: ComputerConfig = {
  name: 'Contacts',
  label: 'Contacts',
  inputs: [],
  outputs: ['all', 'errors'],
  category: 'Hubspot',
  params: [
    str({
      name: 'entity',
      label: 'Entity',
      help: 'The entity to retrieve.',
      value: 'contacts',
    }),
    num({
      name: 'limit',
      label: 'Limit',
      help: 'The maximum number of contacts to return.',
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
    const entity = params.entity as CrmEntity
    const properties: string[] = []
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
          message: e.message
        }])

        return
      }

      yield;
    } while (nextPage && taken < limit);

    yield;
  },
}