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

import { SocketClient } from '../clients/SocketClient';
import { Diagram, NodeDescription } from "@data-story/core";
import { DataStoryNode } from '../../Node/DataStoryNode';
import { ServerClient } from '../clients/ServerClient';
import { JsClient } from '../clients/JsClient';
import { ServerConfig } from '../clients/ServerConfig';
import { reactFlowToDiagram } from '../../../reactFlowToDiagram';
import { reactFlowFromDiagram } from '../../../reactFlowFromDiagram';

export type StoreSchema = {
  /** The main reactflow instance */
  rfInstance: ReactFlowInstance | undefined;
  toDiagram: () => Diagram;
  
  /** Addable Nodes */
  availableNodes: NodeDescription[],
  setAvailableNodes: (nodes: NodeDescription[]) => void,

  /** The Nodes */
  nodes: DataStoryNode[];
  updateNode: (node: DataStoryNode) => void;
  refreshNodes: () => void;
  addNode: (node: DataStoryNode) => void;
  onNodesChange: OnNodesChange;
  setNodes: (nodes: DataStoryNode[]) => void;
  traverseNodes: (direction: 'up' | 'down' | 'left' | 'right') => void;  

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;
  calculateInputSchema: (node: DataStoryNode) => void;  

  /** The Server and its config */
  serverConfig: ServerConfig;
  setServerConfig: (config: ServerConfig) => void;
  server: null | ServerClient;
  onInitServer: (server: ServerConfig) => void;

  /** When DataStory component initializes */
  onInit: (options: {
    rfInstance: ReactFlowInstance,
    server?: ServerConfig,
    diagram?: Diagram,
  }) => void;

  /** Run the diagram */
  onRun: () => void;
  
  /** Modals */
  openNodeModalId: string | null;
  setOpenNodeModalId: (id: string | null) => void;
  open: (nodes: DataStoryNode[], edges: Edge[]) => void;

  /** Not used/implemented at the moment */
  flowName: string;
  setFlowName: (name: string) => void;
  onOpen: () => void;
  onSave: () => void;
};

export const useStore = create<StoreSchema>((set, get) => ({
  // DEFAULTS
  serverConfig: { type: 'SOCKET', url: 'ws://localhost:3100' },
  flowName: 'untitled',
  rfInstance: undefined,
  nodes: [],
  edges: [],
  server: null,
  availableNodes: [],
  openNodeModalId: null,  
  
  // METHODS
  toDiagram: () => {
    const reactFlowObject = get().rfInstance!.toObject()

    return reactFlowToDiagram(reactFlowObject)
  },
  setServerConfig: (config: ServerConfig) => {
    set({ serverConfig: config })

    console.log("TODO: We should reconnect to the server now...")
  },
  setFlowName: (name: string) => {
    set({
      flowName: name,
    });
  },
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
  connect: (connection: Connection) => {
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
  addNode: (node: DataStoryNode) => {
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
    diagram?: Diagram,
  }) => {
    set({
      serverConfig: options.server || {
        type: 'SOCKET',
        url: 'ws://localhost:3100'
      }
    })

    set({ rfInstance: options.rfInstance })
    get().onInitServer(get().serverConfig)

    if(options.diagram) {
      const flow = reactFlowFromDiagram(options.diagram)

      get().setNodes(flow.nodes)
      get().setEdges(flow.edges)
    }
  },
  onRun: () => {
    get().server!.run(
      get().toDiagram()      
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

