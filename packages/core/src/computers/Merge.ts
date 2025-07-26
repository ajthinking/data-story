import { str } from '../Param';
import { Computer } from '../types/Computer';
import { ItemValue } from '../types/ItemValue';
import { buildNestedObject } from '../utils/buildNestedObject';
import { merge } from '../utils/merge';

export const Merge: Computer = {
  type: 'Computer',
  computerType: 'Merge',
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
      value: 'id',
    }),
    str({
      name: 'supplier_key',
      label: 'Supplier Key',
      help: 'The supplier key to merge on',
      value: 'id',
    }),
    str({
      name: 'merge_key',
      label: 'Merge Key',
      help: 'Optional key to merge into',
      value: '',
    }),
  ],

  canRun({ input, isAvailable }) {
    const haveAllRequestors = input.haveAllItemsAtInput('requestors')
    const haveAllSuppliers = input.haveAllItemsAtInput('suppliers')

    return isAvailable() && haveAllRequestors && haveAllSuppliers
  },

  async *run({ input, output, params }) {
    const requestors = input.pullFrom('requestors')
    const suppliers = input.pullFrom('suppliers')

    const requestorKey = params.requestor_key as string
    const supplierKey = params.supplier_key as string

    const merged: ItemValue[] = []
    const notMerged: ItemValue[] = []

    for(const requestor of requestors) {
      const matchingSupplier = suppliers.find(supplier => {
        const supplierValue = supplier.value[supplierKey]
        const requestorValue = requestor.value[requestorKey]

        return supplierValue === requestorValue
      })

      if(matchingSupplier) {
        const mergableSupplierValue = buildNestedObject(
          params.merge_key as string,
          matchingSupplier.value,
        )

        merged.push(merge(
          requestor.value,
          mergableSupplierValue,
        ))
      } else {
        notMerged.push(requestor)
      }
    }

    output.pushTo('merged', merged)
    output.pushTo('not_merged', notMerged)
  },
}