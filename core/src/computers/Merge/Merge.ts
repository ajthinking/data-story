import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';
import { ItemValue } from '../../types/ItemValue';
import { string } from '../../ParamBuilder';

export const Merge: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Merge',
  inputs: ['requestors', 'suppliers'],
  outputs: [
    'merged',
    'not_merged',
  ],
  params: {
    requestor_merge_property: string('requestor_merge_property')
      .schemaFromPort('requestors')
      .get(),
    supplier_merge_property: string('supplier_merge_property')
      .schemaFromPort('suppliers')
      .get(),
  },

  canRun({ isAvailable, input }) {
    return [
      isAvailable(),
      input.haveItemsAtInput('requestors'),
      input.haveAllItemsAtInput('suppliers')
    ].every(Boolean)
  },

  async *run({ input, output, params }) {
    // The suppliers are potentially referenced multiple times,
    // therefore we keep them outside the loop
    const suppliers = input.pullFrom('suppliers').map(i => i.value) as ItemValue[]

    while(true) {
      const requestors = input.pullFrom('requestors').map(i => i.value) as ItemValue[]

      for(const requestor of requestors) {
        const requestorKey = params.requestor_merge_property
        const requestorValue: any = requestor[requestorKey] as any

        const supplierKey = params.supplier_merge_property
        const supplierMatch = suppliers.find(supplier => {
          return supplier[supplierKey] === requestorValue
        })
        
        if (supplierMatch) {
          const merged = { ...requestor, ...supplierMatch }
          output.pushTo('merged', [merged])
        } else {
          output.pushTo('not_merged', [requestor])
        }
      }

      yield;
    }
  },
});