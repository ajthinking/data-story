import { Param, PortSelectionParam } from '@data-story/core'
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { useMemo, useState } from 'react';

export function PortSelectionInput({
  param,
  form,
  name,
  node,
}: {
  param: Param
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  name?: string,
  node: ReactFlowNode,
}) {
  const [ addPortOpen, setAddPortOpen ] = useState(false)
  const [ newPortName, setNewPortName ] = useState('')
  const [ newPortSchema, setNewPortSchema ] = useState('{}')
  const outputsDraft = useWatch({
    control: form.control,
    name: 'outputs',
    exact: true,
  });
  const parsedOutputs = useMemo(() => JSON.parse(outputsDraft), [outputsDraft]);

  const onAddPort = () => {
    const newPort = {
      name: newPortName,
      id: `${node.id}.${newPortName}`,
      schema: JSON.parse(newPortSchema)
    }

    const alreadyExists = node.data.outputs.find((port) => port.name === newPortName)

    if(!alreadyExists) node.data.outputs.unshift(newPort)

    setAddPortOpen(false)

    form.setValue(name!, newPortName)
    form.setValue('outputs', JSON.stringify(node.data.outputs, null, 2))
  }

  const allowCreate = (param as PortSelectionParam).allowCreate

  return (<div className="group flex flex-col bg-gray-50">
    <div className="flex justify-between">
      <select
        key={'ports'}
        className="bg-gray-50 px-2 py-1"
        {...form.register(name!)}
      >
        {parsedOutputs.map(output => (<option
          key={output.name}
          value={output.name}
        >{output.name}</option>))}
      </select>
      {allowCreate && <button
        onClick={() => setAddPortOpen(!addPortOpen)}
        key={'add-port'}
        className="bg-gray-50 px-2 py-1"
      >+ Add port</button>}
    </div>
    {addPortOpen && <div className="flex p-2 space-y-2 flex-col">
      <input
        className="bg-gray-50 px-2 py-1 border border-gray-300"
        placeholder='new port name...'
        onChange={(e) => setNewPortName(e.target.value)}
      />
      <textarea
        className="bg-gray-50 px-2 py-1 border border-gray-300"
        placeholder='new port schema...'
        defaultValue={newPortSchema}
        onChange={(e) => setNewPortSchema(e.target.value)}
      />
      <button
        className="bg-gray-50 px-2 py-1 border border-gray-300"
        onClick={onAddPort}
      >Save</button>
    </div>}
  </div>)
}
