import { useEffect, useRef, useState } from 'react';
import { Connection } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { NodeDescription } from "@data-story/core";
import { DataStoryNode } from '../../Node/DataStoryNode';
import { makeNodeAndConnection } from '../hooks/makeNodeAndConnection';
import { Modal } from '../modal'
import { StoreSchema, useStore } from '../store';

export const AddNodeModal = ({ setShowModal }: {
  setShowModal: (show: boolean) => void
}) => {
  const inputReference = useRef<HTMLInputElement>(null);  
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputReference?.current?.focus();
  }, [])

  const selector = (state: StoreSchema) => ({
      nodes: state.nodes,
      edges: state.edges,
      onAddNode: state.onAddNode,
      onConnect: state.onConnect,
      availableNodes: state.availableNodes,
  });

  const { nodes, onAddNode, onConnect, availableNodes } = useStore(selector, shallow);

  const doAddNode = (nodeDescription: NodeDescription) => {
    // Create node and attempt to guess connection
    const [
      node,
      connection
    ]: [
      DataStoryNode,
      Connection | null
    ] = makeNodeAndConnection(nodes, nodeDescription)

    // Call React Flow hooks to add node and link to store
    onAddNode(node)
    if(connection) onConnect(connection);

    // Close modal
    setShowModal(false)
  }

  const matchingNodes = availableNodes
    .sort((a: NodeDescription, b: NodeDescription) => {
      if((a.category || '') < (b.category || '')) return -1;
      if((a.category || '') > (b.category || '')) return 1;
      return 0;
    })
    .filter((nodeDescription: NodeDescription) => {
    return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase())
  })

  return (<Modal
    setShowModal={setShowModal}
  >
    <div>
      <input 
        className="w-full bg-white mb-2 text-gray-500 font-mono text-sm border border-gray-100 rounded px-4 py-4" placeholder={"Type format, action, resource ..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={inputReference}
      ></input>
    </div>
    <div className="group grid grid-cols-2 gap-2">
      {matchingNodes.map((nodeDescription: NodeDescription) => {
        return (<button
          tabIndex={0}
          className="flex justify-between font-bold cursor-pointer bg-slate-100 hover:bg-slate-200 text-gray-400 flex items-center px-4 py-2 border border-gray-300 text-base shadow"
          key={nodeDescription.name}
          onClick={() => doAddNode(nodeDescription)}
          >
            <div className="text-gray-500 text-sm"><span className="text-indigo-500 font-mono">{nodeDescription.category || 'Core'}::</span>{nodeDescription.label || nodeDescription.name}</div>
            <div className="flex space-x-1">
              {nodeDescription.tags.map((tag: string) => {
                let style = "bg-blue-300 border px-2 rounded tracking-wide text-xxs text-white"
                return (<div key={tag} className={style}>{tag}</div>)
              })}
            </div>
        </button>)
      })}                                                
    </div>
  </Modal>)
}