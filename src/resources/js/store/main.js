import { action, observable, makeObservable } from "mobx"
import { DefaultLinkModel } from '@projectstorm/react-diagrams'
import NodeModel from '../NodeModel'
import _ from 'lodash'


export class Store {

    diagram = {
        engine: null,
        availableNodes: [],
        refresh: 0,
        latestNode: null,
        nodeSerial: 1,
    }

    metadata = {
        running: false,
        page: 'Workbench',
        activeInspector: null,
    }

    constructor() {
        makeObservable(this, {
            // Oservables
            diagram: observable,
            metadata: observable,
            
            // Setters
            addNode: action.bound,
            increaseNodeSerial: action.bound,
            goToInspector: action.bound,
            refreshDiagram: action.bound,
            setActiveInspector: action.bound,
            setAvailableNodes: action.bound,
            setEngine: action.bound,
            setLatestNode: action.bound,
            setPage: action.bound,
            setResults: action.bound,
            setNotRunning: action.bound,
            setRunning: action.bound,
            setStory: action.bound,

            // Getters 👇
        })
    }

    addNode(data) {
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

    getAutomatedLink(from, to) {
        if(!from) return
        // Ports
        let fromPort = Object.values(from.getOutPorts())[0] ?? false;
        let toPort = Object.values(to.getInPorts())[0] ?? false;

        // Ensure there are ports to connect to
        if(!fromPort || !toPort) return;
        
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

    setStory(name) {
        this.metadata.story = name
    }    
}
export default window.store = new Store