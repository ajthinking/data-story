import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemValue } from '../../types/ItemValue';
import { json, string } from '../../ParamBuilder';
import { hubspot } from './hubspot';
import { ComputerConfig } from '../../types/ComputerConfig';
import { CrmEntity } from './CrmEntity';

export const UpdateEntity: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'UpdateEntity',
  inputs: ['input'],
  outputs: ['updated', 'errors'],
  params: {
    entity: string('entity').value('companies').get(),
    properties: json('properties').value('["name"]').get(),
  },
  category: 'HubSpot',
  tags: ['HubSpot'],  

  async *run({ input, output, params }) {
    const entity = params.entity as CrmEntity    
    const properties = JSON.parse(params.properties)
    
    while(true) {
      const incoming = input.pull() as ItemValue[]

      for(const item of incoming) {
        try {
          const result = await hubspot.crm[entity].basicApi.update(item.id, properties)
          output.pushTo('updated', [result])
          yield;
        } catch(e) {
          output.pushTo('errors', ['Could not update entity'])
          yield;
        }
      }
    }
  },
});
