"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
const zustand_1 = require("zustand");
const reactflow_1 = require("reactflow");
const SocketClient_1 = require("../clients/SocketClient");
const JsClient_1 = require("../clients/JsClient");
const reactFlowToDiagram_1 = require("../../../reactFlowToDiagram");
const reactFlowFromDiagram_1 = require("../../../reactFlowFromDiagram");
exports.useStore = (0, zustand_1.create)((set, get) => ({
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
        const reactFlowObject = get().rfInstance.toObject();
        return (0, reactFlowToDiagram_1.reactFlowToDiagram)(reactFlowObject);
    },
    setServerConfig: (config) => {
        set({ serverConfig: config });
        console.log("TODO: We should reconnect to the server now...");
    },
    setFlowName: (name) => {
        set({
            flowName: name,
        });
    },
    onNodesChange: (changes) => {
        set({
            nodes: (0, reactflow_1.applyNodeChanges)(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: (0, reactflow_1.applyEdgeChanges)(changes, get().edges),
        });
    },
    connect: (connection) => {
        const fromHandleId = connection.sourceHandle;
        const toHandleId = connection.targetHandle;
        set({
            edges: (0, reactflow_1.addEdge)(Object.assign(Object.assign({}, connection), { id: `${fromHandleId}--->${toHandleId}` }), get().edges),
        });
        // Calculate input schema for the target node
        const targetNode = get().nodes.find(node => node.id === connection.target);
        if (targetNode) {
            get().calculateInputSchema(targetNode);
        }
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes.map(node => {
                    // When adding a node, deselect all other nodes
                    node.selected = false;
                    return node;
                }), node],
        });
    },
    updateNode: (node) => {
        set({
            nodes: get().nodes.map(existingNode => {
                if (existingNode.id === node.id) {
                    return node;
                }
                return existingNode;
            }),
        });
    },
    setNodes: (nodes) => {
        set({
            nodes: [...nodes],
        });
    },
    refreshNodes: () => {
        console.log(get().nodes);
        set({
            nodes: [...get().nodes],
        });
    },
    setEdges(edges) {
        set({ edges });
    },
    onInit: (options) => {
        set({
            serverConfig: options.server || {
                type: 'SOCKET',
                url: 'ws://localhost:3100'
            }
        });
        set({ rfInstance: options.rfInstance });
        get().onInitServer(get().serverConfig);
        if (options.diagram) {
            const flow = (0, reactFlowFromDiagram_1.reactFlowFromDiagram)(options.diagram);
            get().setNodes(flow.nodes);
            get().setEdges(flow.edges);
        }
        if (options.callback) {
            const run = () => {
                var _a;
                (_a = get().server) === null || _a === void 0 ? void 0 : _a.run(
                // TODO it seems this does not await setNodes/setEdges?
                get().toDiagram());
            };
            options.callback({ run });
        }
    },
    onRun: () => {
        get().server.run(get().toDiagram());
    },
    onInitServer: (serverConfig) => {
        if (serverConfig.type === 'JS') {
            const server = new JsClient_1.JsClient(get().setAvailableNodes, get().updateEdgeCounts, (nodes) => set({ nodes }), (edges) => set({ edges }), 
            // (viewport) => set({ viewport }),
            serverConfig.app);
            set({ server });
            server.init();
        }
        if (serverConfig.type === 'SOCKET') {
            const server = new SocketClient_1.SocketClient(get().setAvailableNodes, get().updateEdgeCounts, (nodes) => set({ nodes }), (edges) => set({ edges }));
            set({ server });
            server.init();
        }
    },
    setAvailableNodes: (availableNodes) => {
        set({ availableNodes });
    },
    updateEdgeCounts: (edgeCounts) => {
        for (const [id, count] of Object.entries(edgeCounts)) {
            const edge = get().edges.find(edge => edge.id === id);
            if (edge)
                edge.label = count;
        }
        const newEdges = get().edges.map((edge) => {
            Object.entries(edgeCounts).forEach(([id, count]) => {
                if (edge.id === id) {
                    edge.label = count;
                    edge.labelBgStyle = {
                        opacity: 0.6,
                    };
                }
            });
            return edge;
        });
        get().setEdges(newEdges);
    },
    setOpenNodeModalId: (id) => {
        set({ openNodeModalId: id });
    },
    onOpen: () => {
        get().server.open("demo.story.json");
        console.log("Opening...");
    },
    open: (nodes, edges) => {
        get().setNodes(nodes);
        get().setEdges(edges);
    },
    onSave: () => {
        let name = get().flowName;
        if (name === "untitled" || name === "" || name === undefined) {
            alert("Please choose a name before saving.");
            return;
        }
        if (!name.endsWith(".json"))
            name = name + ".json";
        get().server.save(name, get().rfInstance.toObject());
        console.log("Saving...");
    },
    traverseNodes: (direction) => {
        const selectedNodes = get().nodes.filter(node => node.selected);
        // If multiple nodes are selected we cant navigate
        if (selectedNodes.length > 1)
            return;
        // If no nodes are selected, select the first node
        if (selectedNodes.length === 0 && get().nodes.length > 0) {
            const firstNode = get().nodes.at(0);
            firstNode.selected = true;
            get().updateNode(firstNode);
            return;
        }
        // // If one node is selected, navigate
        if (selectedNodes.length === 1 && get().nodes.length > 0) {
            const node = selectedNodes.at(0);
            const otherNodes = get().nodes.filter(otherNode => otherNode.id !== node.id);
            // Find the closest node in the direction
            if (direction === 'up') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.y < node.position.y) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.y > closest.position.y)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'down') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.y > node.position.y) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.y < closest.position.y)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'left') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.x < node.position.x) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.x > closest.position.x)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'right') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.x > node.position.x) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.x < closest.position.x)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
        }
    },
    calculateInputSchema: (node) => {
        const links = get().edges.filter(edge => edge.target === node.id);
        const inputSchemas = {};
        links.forEach(link => {
            var _a, _b, _c;
            const sourceNode = get().nodes.find(node => node.id === link.source);
            if (!sourceNode)
                return;
            const sourcePortName = (_a = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)) === null || _a === void 0 ? void 0 : _a.name;
            const targetPortName = (_b = node.data.inputs.find(input => input.id === link.targetHandle)) === null || _b === void 0 ? void 0 : _b.name;
            if (!sourcePortName || !targetPortName)
                return;
            const outputSchema = (_c = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)) === null || _c === void 0 ? void 0 : _c.schema;
            const inputPort = node.data.inputs.find(input => input.id === link.targetHandle);
            inputPort.schema = outputSchema !== null && outputSchema !== void 0 ? outputSchema : {};
        });
        // node.data.inputSchemas = inputSchemas
        // get().updateNode(node)
    },
}));
