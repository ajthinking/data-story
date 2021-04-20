import { action, observable, makeObservable } from "mobx"
import { DefaultLinkModel } from '@projectstorm/react-diagrams'
import NodeModel from '../../core/NodeModel'
import _ from 'lodash'
import clientFactory from '../clients/ClientFactory';

export class Store {

    diagram = {
        engine: null,
        availableNodes: [],
        refresh: 0,
        latestNode: null,
        latestNodes: [],
        nodeSerial: 1,
    }

    metadata = {
        running: false,
        page: 'Workbench',
        activeInspector: null,
        stories: [],
        activeStory: '',
        server: clientFactory(window.dataStoryConfig.client ?? 'LocalClient'),
    }

    constructor() {
        makeObservable(this, {
            // Observables
            diagram: observable,
            metadata: observable,
            
            // Setters
            addNode: action.bound,
            clearLinkLabels: action.bound,
            increaseNodeSerial: action.bound,
            goToInspector: action.bound,
            refreshDiagram: action.bound,
            setActiveInspector: action.bound,
            setActiveStory: action.bound,
            setAvailableNodes: action.bound,
            setEngine: action.bound,
            setLatestNode: action.bound,
            setPage: action.bound,
            setResults: action.bound,
            setNotRunning: action.bound,
            setRunning: action.bound,
            setStories: action.bound,

            // Getters 👇
        })
    }

    addNode(data) {
        var node = new NodeModel({
           serial: this.diagram.nodeSerial++,
           ...data
        });
        
        this.attemptLinkToLatest(node)
        this.smartInspectorNames(node)
        
        this.diagram.engine.model.addNode(node);
        this.diagram.latestNodes.unshift(node);
        this.refreshDiagram()
    }

    attemptLinkToLatest(node)
    {
        let linked = false;

        // Try to link to latest nodes
        this.diagram.latestNodes.find(latest => {
            if(this.diagram.engine.model.hasNode(latest)) {
                if(this.canLink(latest, node)) {
                    // Spread the nodes nicely
                    this.setLinkedNodePosition(latest, node)
                    // Link to latest node
                    this.diagram.engine.model.addAll(
                        this.getAutomatedLink(latest, node)
                    );
                    // Dont continue traversing latestNodes array
                    return linked = true;
                }

            }
        })

        if(linked) return;

        // Fallback 1: place below latest node
        // Fallback 2: place at 100, 100
        let latest = this.diagram.latestNodes[0] ?? null;

        node.setPosition(
            latest?.position?.x ? latest.position.x : 100,
            latest?.position?.y ? latest.position.y + 75 : 100            
        );
    }

    smartInspectorNames(node)
    {
        if(node.options.name != 'Inspect') return;

        let nameParam = node.options.parameters.find(n => n.name == 'node_name')

        let sourceLink = Object.values(node.ports?.Input?.links)[0] ?? null
        if(!sourceLink) return;
        let sourcePortName = sourceLink.sourcePort.options.name ?? false
        
        // It must be a specific name to make sense
        if(!sourcePortName || sourcePortName == 'Output') return;

        nameParam.value = sourcePortName
        
    }

    addNodeOld(data) {
        var node = new NodeModel({
           serial: this.diagram.nodeSerial++,
           ...data
        });

        node.setPosition(100, 100 + Math.random() * 100);

        let latestNode = this.diagram.latestNode

        if(this.diagram.engine.model.hasNode(latestNode)) {
            node.setPosition(latestNode.position.x+200, latestNode.position.y);
            let link = this.getAutomatedLink(latestNode, node)
            if(link) this.diagram.engine.model.addAll(link);
        }
        
        this.diagram.engine.model.addNode(node);
        this.setLatestNode(node)
        this.refreshDiagram()
    }    

    clearLinkLabels() {
        Object.values(this.diagram.engine.model.layers[0].models).forEach((link) => {
            link.labels = []
        })
    }

    getAutomatedLink(from, to) {
        if(!this.canLink(from, to)) return;

        // fromPort: prefer first unused outPort. Otherwise defaults to first
        let fromPort = Object.values(from.getOutPorts()).find(candidate => {
            return Object.values(candidate.links).length === 0
        }) ?? Object.values(from.getOutPorts())[0]

        // toPort: the first inPort
        let toPort = Object.values(to.getInPorts())[0];
        
        // Links
        let link = new DefaultLinkModel()
        link.setSourcePort(fromPort);
        link.setTargetPort(toPort);            
        
        // track: https://github.com/projectstorm/react-diagrams/issues/617
        //link.addLabel(Math.floor(Math.random()*1000));

        // Report
        fromPort.reportPosition()
        toPort.reportPosition()

        return link
    }

    canLink(from, to)
    {
        // Has from node?
        if(!from) return
        
        // Resolve ports
        let fromPort = Object.values(from.getOutPorts())[0] ?? false;
        let toPort = Object.values(to.getInPorts())[0] ?? false;

        // Ensure there are ports to connect to
        return fromPort && toPort
    }

    setLinkedNodePosition(latest, node)
    {
        let fromPort = Object.values(latest.getOutPorts())[0] ?? false;

        node.setPosition(
            latest.position.x + 200,
            latest.position.y + (Object.keys(fromPort.links).length) * 75
        );
    }    

    goToInspector(id) {
        this.metadata.activeInspector = id
        this.metadata.page = 'Inspector'
    }

    nodesWithInspectables() {
        // React diagram is not observable outside of its own context
        // Reference the refresh counter to ensure we have the latest data
        this.diagram.refresh

        // Get all nodes with features
        return this.diagram.engine.model.getNodes().filter(node => node.isInspectable())
    }    

    refreshDiagram() {
        this.diagram.refresh++     
    }

    increaseNodeSerial() {
        this.diagram.nodeSerial++        
    }

    setActiveStory(story) {
        this.metadata.activeStory = story
    }

    setActiveInspector(nodeId) {
        this.metadata.activeInspector = nodeId
    }

    setAvailableNodes(nodes) {
        this.diagram.availableNodes = nodes
    }

    setEngine(engine) {
        this.diagram.engine = engine
    }

    setLatestNode(node) {
        this.diagram.latestNode = node
    }
    
    setPage(name) {
        this.clearLinkLabels()
        this.metadata.page = name
    }
    
    setResults(results) {
        this.results = results
    }

    setNotRunning() {
        setTimeout(() => {
            this.metadata.running = false
        }, 500)
    }

    setRunning() {
        this.metadata.running = true
    }

    setStories(stories) {
        this.metadata.stories = stories
    }    
}
export default window.store = new Store