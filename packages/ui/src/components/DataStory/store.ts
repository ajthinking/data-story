import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowInstance,
} from 'reactflow';

import { SocketClient } from './clients/SocketClient';
import { NodeDescription } from "@data-story/core";
import { DataStoryNode } from '../Node/DataStoryNode';
import { ServerClient } from './clients/ServerClient';
import { JsClient } from './clients/JsClient';
import { ServerConfig } from './clients/ServerConfig';

export type StoreSchema = {
  flowName: string;
  setFlowName: (name: string) => void;
  rfInstance: ReactFlowInstance | undefined;
  availableNodes: NodeDescription[],
  setAvailableNodes: (nodes: NodeDescription[]) => void,
  nodes: DataStoryNode[];
  edges: Edge[];
  serverConfig: ServerConfig;
  setServerConfig: (config: ServerConfig) => void;
  server: null | ServerClient;
  refreshNodes: () => void;
  updateNode: (node: DataStoryNode) => void;
  onAddNode: (node: DataStoryNode) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: (options: {
    rfInstance: ReactFlowInstance,
    server?: ServerConfig
  }) => void;
  onRun: () => void;
  onInitServer: (server: ServerConfig) => void;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  openNodeModalId: string | null;
  setOpenNodeModalId: (id: string | null) => void;
  open: (nodes: DataStoryNode[], edges: Edge[]) => void;
  onOpen: () => void;
  onSave: () => void;
  setNodes: (nodes: DataStoryNode[]) => void;
  traverseNodes: (direction: 'up' | 'down' | 'left' | 'right') => void;
  calculateInputSchema: (node: DataStoryNode) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<StoreSchema>((set, get) => ({
  serverConfig: { type: 'SOCKET', url: 'ws://localhost:3100' },
  setServerConfig: (config: ServerConfig) => {
    set({ serverConfig: config })

    console.log("TODO: We should reconnect to the server now...")
  },
  flowName: 'untitled',
  setFlowName: (name: string) => {
    set({
      flowName: name,
    });
  },
  rfInstance: undefined,
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const fromHandleId = connection.sourceHandle;
    const toHandleId = connection.targetHandle;

    set({
      edges: addEdge({
        ...connection,
        id: `${fromHandleId}--->${toHandleId}`,
      }, get().edges),
    });

    // Calculate input schema for the target node
    const targetNode = get().nodes.find(node => node.id === connection.target)
    if(targetNode) {
      get().calculateInputSchema(targetNode)
    }
  },
  onAddNode: (node: DataStoryNode) => {
    set({
      nodes: [...get().nodes.map(node => {
        // When adding a node, deselect all other nodes
        node.selected = false
        return node
      }), node],
    })
  },
  updateNode: (node: DataStoryNode) => {
    set({
      nodes: get().nodes.map(existingNode => {
        if(existingNode.id === node.id) {
          return node
        }

        return existingNode
      }),
    })
  },
  setNodes: (nodes: DataStoryNode[]) => {
    set({
      nodes: [...nodes],
    })
  },
  refreshNodes: () => {
    console.log(get().nodes)

    set({
      nodes: [...get().nodes],
    })
  },
  setEdges(edges: Edge[]) {
    set({ edges })
  },
  onInit: (options: {
    rfInstance: ReactFlowInstance,
    server?: ServerConfig,
  }) => {
    set({
      serverConfig: options.server || {
        type: 'SOCKET',
        url: 'ws://localhost:3100'
      }
    })

    set({ rfInstance: options.rfInstance })
    get().onInitServer(get().serverConfig)
  },
  onRun: () => {
    get().server!.run(
      get().rfInstance!.toObject()      
    )
  },
  onInitServer: (server: ServerConfig) => {
    if(server.type === 'JS') {
      const server = new JsClient(
        get().setAvailableNodes,
        get().updateEdgeCounts,
        (nodes) => set({ nodes }),
        (edges) => set({ edges }),
        // (viewport) => set({ viewport }),
      )
  
      set({ server })
      server.init()
    }      

    if(server.type === 'SOCKET') {
      const server = new SocketClient(
        get().setAvailableNodes,
        get().updateEdgeCounts,
        (nodes) => set({ nodes }),
        (edges) => set({ edges }),
        // (viewport) => set({ viewport }),
      )
  
      set({ server })
      server.init()
    }    
  },
  server: null,
  availableNodes: [],
  setAvailableNodes: (availableNodes: NodeDescription[]) => {
    set({ availableNodes })
  },
  updateEdgeCounts: (edgeCounts: Record<string, number>) => {
    for(const [id, count] of Object.entries(edgeCounts)) {
      const edge = get().edges.find(edge => edge.id === id)
      if (edge) edge.label = count
    }

    const newEdges = get().edges.map((edge: Edge) => {
      Object.entries(edgeCounts).forEach(([id, count]) => {
        if (edge.id === id) {
          edge.label = count
          edge.labelBgStyle = {
            opacity: 0.6,
          }
        }
      })

      return edge
    })

    get().setEdges(newEdges);
  },
  openNodeModalId: null,
  setOpenNodeModalId: (id: string | null) => {
    set({ openNodeModalId: id })
  },
  onOpen: () => {
    get().server!.open("demo.story.json")

    console.log("Opening...")
  },
  open: (nodes: DataStoryNode[], edges: any) => {
    get().setNodes(nodes);
    get().setEdges(edges);
  },
  onSave: () => {
    let name = get().flowName

    if(name === "untitled" || name === "" || name === undefined) {
      alert("Please choose a name before saving.")
      return
    }    

    if(!name.endsWith(".json")) name = name + ".json"

    get().server!.save(
      name,
      get().rfInstance!.toObject()      
    )

    console.log("Saving...")
  },
  traverseNodes: (direction: 'up' | 'down' | 'left' | 'right') => {
    const selectedNodes = get().nodes.filter(node => node.selected)

    // If multiple nodes are selected we cant navigate
    if(selectedNodes.length > 1) return

    // If no nodes are selected, select the first node
    if(selectedNodes.length === 0 && get().nodes.length > 0) {
      const firstNode = get().nodes.at(0)!
      firstNode.selected = true
      get().updateNode(firstNode)
      return
    }

    // // If one node is selected, navigate
    if(selectedNodes.length === 1 && get().nodes.length > 0) {
      const node = selectedNodes.at(0)!
      const otherNodes = get().nodes.filter(otherNode => otherNode.id !== node.id)

      // Find the closest node in the direction
      if(direction === 'up') {
        const closestNode = otherNodes.reduce((closest, otherNode) => {
          if(otherNode.position.y < node.position.y) {
            if(closest === null) return otherNode
            if(otherNode.position.y > closest.position.y) return otherNode
          }

          return closest
        }, null as DataStoryNode | null)

        if(closestNode) {
          node.selected = false
          get().updateNode(node)          
          closestNode.selected = true
          get().updateNode(closestNode)
        }
      }

      if(direction === 'down') {
        const closestNode = otherNodes.reduce((closest, otherNode) => {
          if(otherNode.position.y > node.position.y) {
            if(closest === null) return otherNode
            if(otherNode.position.y < closest.position.y) return otherNode
          }

          return closest
        }, null as DataStoryNode | null)

        if(closestNode) {
          node.selected = false
          get().updateNode(node)
          closestNode.selected = true
          get().updateNode(closestNode)
        }
      }

      if(direction === 'left') {
        const closestNode = otherNodes.reduce((closest, otherNode) => {
          if(otherNode.position.x < node.position.x) {
            if(closest === null) return otherNode
            if(otherNode.position.x > closest.position.x) return otherNode
          }

          return closest
        }, null as DataStoryNode | null)

        if(closestNode) {
          node.selected = false
          get().updateNode(node)          
          closestNode.selected = true
          get().updateNode(closestNode)
        }
      }

      if(direction === 'right') {
        const closestNode = otherNodes.reduce((closest, otherNode) => {
          if(otherNode.position.x > node.position.x) {
            if(closest === null) return otherNode
            if(otherNode.position.x < closest.position.x) return otherNode
          }

          return closest
        }, null as DataStoryNode | null)

        if(closestNode) {
          node.selected = false
          get().updateNode(node)          
          closestNode.selected = true
          get().updateNode(closestNode)
        }
      }
    }
  },
  calculateInputSchema: (node: DataStoryNode) => {
    const links = get().edges.filter(edge => edge.target === node.id)
    const inputSchemas: Record<string, any> = {}

    links.forEach(link => {
      const sourceNode = get().nodes.find(node => node.id === link.source)
      if(!sourceNode) return

      const sourcePortName = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)?.name
      const targetPortName = node.data.inputs.find(input => input.id === link.targetHandle)?.name
      if(!sourcePortName || !targetPortName) return;

      const outputSchema = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)?.schema

      const inputPort = node.data.inputs.find(input => input.id === link.targetHandle)!
      inputPort.schema = outputSchema ?? {}
    })

    // node.data.inputSchemas = inputSchemas

    // get().updateNode(node)
  },
}));