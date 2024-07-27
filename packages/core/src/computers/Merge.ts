import { str } from '../Param';
import { Computer } from '../types/Computer';

export const Merge: Computer = {
  name: 'Merge',
  label: 'Merge',
  inputs: [
    {
      name: 'requestors',
      schema: {},
    },
    {
      name: 'suppliers',
      schema: {},
    },
  ],
  outputs: [
    {
      name: 'merged',
      schema: {},
    },
    {
      name: 'not_merged',
      schema: {},
    },
  ],
  params: [
    str({
      name: 'requestor_key',
      label: 'Requestor Key',
      help: 'The requestor key to merge on',
      value: 'id'
    }),
    str({
      name: 'supplier_key',
      label: 'Supplier Key',
      help: 'The supplier key to merge on',
      value: 'id'
    }),
  ],

  canRun({ input, params }) {
    // const haveRequestor = input.haveItemsAtInput('requestors') // TODO

    const haveAllRequestors = input.haveAllItemsAtInput('requestors')
    const haveAllSuppliers = input.haveAllItemsAtInput('suppliers')

    return haveAllRequestors && haveAllSuppliers
  },

  async *run({ input, output, params }) {
    const requestors = input.pullFrom('requestors')
    const suppliers = input.pullFrom('suppliers')

    const requestorKey = params.requestor_key as string
    const supplierKey = params.supplier_key as string

    const merged = []
    const notMerged = []

    for(const requestor of requestors) {
      const matchingSupplier = suppliers.find(supplier => {
        const supplierValue = supplier.value[supplierKey]
        const requestorValue = requestor.value[requestorKey]

        return supplierValue === requestorValue
      })

      if(matchingSupplier) {
        merged.push({
          ...requestor.value,
          ...matchingSupplier.value
        })
      } else {
        notMerged.push(requestor)
      }
    }

    output.pushTo('merged', merged)
    output.pushTo('not_merged', notMerged)
  }
}