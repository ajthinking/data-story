import { action, observable, makeObservable } from "mobx"
import { DefaultLinkModel } from '@projectstorm/react-diagrams'
import NodeModel from '../../core/NodeModel'
import _ from 'lodash'
import clientFactory from '../clients/ClientFactory';

export class Store {

    results

    diagram = {
        engine: null,
        availableNodes: [],
        refresh: 0,
        latestNodes: [],
        nodeSerial: 1,
    }

    metadata = {
        running: false,
        page: 'Workbench',
        activeInspector: null,
        stories: [],
        activeStory: '',
        client: clientFactory((window as any).dataStoryConfig.client ?? 'LocalClient'),
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
            setPage: action.bound,
            setResults: action.bound,
            setNotRunning: action.bound,
            setRunning: action.bound,
            setStories: action.bound,

            // Getters 👇
        })
    }

    addNode(data) {
        this.diagram.engine.model.addNode(new NodeModel({
			serial: this.diagram.nodeSerial++,
			...data
		 }));

		this.refreshDiagram()
    }

    clearLinkLabels() {
        Object.values(this.diagram.engine.model.layers[0].models).forEach((link: any) => {
            link.labels = []
        })
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
export default (window as any).store = new Store