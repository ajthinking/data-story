import { Param } from '@data-story/core'
import { UseFormReturn } from 'react-hook-form';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';
import { useState } from 'react';

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
  node: DataStoryNode,
}) {
  const [ addPortOpen, setAddPortOpen ] = useState(false)
  const [ newPortName, setNewPortName ] = useState('')
  const [ newPortSchema, setNewPortSchema ] = useState('{}')

  const onAddPort = () => {
    const newPort = {
      name: newPortName,
      id: `${node.id}.${newPortName}`,
      schema: JSON.parse(newPortSchema)
    }

    node.data.outputs.unshift(newPort)

    setAddPortOpen(false)

    console.log({ name })
    form.setValue(name!, newPortName)
    form.setValue('outputs', JSON.stringify(node.data.outputs, null, 2))
  }

  return (<div className="group flex flex-col bg-gray-50">
    <div className="flex justify-between">
      <select
        key={'ports'}
        className="bg-gray-50 px-2 py-1"
        {...form.register(name!)}
      >
        {node.data.outputs.map(output => (<option
          key={output.name}
          value={output.name}
        >{output.name}</option>))}
      </select>
      <button
        onClick={() => setAddPortOpen(!addPortOpen)}
        key={'add-port'}
        className="bg-gray-50 px-2 py-1"
      >+ Add port</button>
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