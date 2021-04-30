import { DefaultLinkModel, DiagramModel as DefaultDiagramModel, DiagramModelGenerics, NodeModelGenerics } from '@projectstorm/react-diagrams'
import NodeModel, { NodeModelOptions } from './NodeModel'
import { SerializedDiagramModel } from './types/SerializedDiagramModel'
import VERSION from './utils/version'

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DiagramModel extends DefaultDiagramModel {
	latestNodes: NodeModel[] = []

	addNode(node) { 
		this.attemptLinkToLatest(node)
		this.smartInspectorNames(node)		 
		this.latestNodes.unshift(node);
		return super.addNode(node)
	}

    cachedNodeDependencyMap: {[T:string]: string[];} = {
        // id1: [d1, d2, ...]
    }

    getCachedNodeDependencies(id) {
        return this.cachedNodeDependencyMap[id] ?? null
    }

    setCachedNodeDependencies(id, dependencies) {
        this.cachedNodeDependencyMap[id] = dependencies
    }

    clearCachedNodeDependencies() {
        this.cachedNodeDependencyMap = {}
    }

    serialize() : SerializedDiagramModel {
		return {
			...super.serialize(),
			executionOrder: this.executionOrder().map(node => node.getOptions().id),
			version: VERSION
		}
    }

    hasNode(node) {
        return Boolean(
            node?.options?.id &&
            this.getNode(node.options.id)
        )        
    }

    executionOrder() {
        this.clearCachedNodeDependencies();

        return this.getNodes().sort(function(n1: NodeModel, n2: NodeModel) {

            if (n2.dependsOn(n1)) {
                return -1;
            }

            if (n1.dependsOn(n2)) {
              return 1;
            }

            return 0;
          });
    }

    attemptLinkToLatest(node)
    {
        
        let linked = false;
        
        // Try to link to latest nodes
        this.latestNodes.find(latest => {
            if(this.hasNode(latest)) {
                if(this.canLink(latest, node)) {
                    // Spread the nodes nicely
                    this.setLinkedNodePosition(latest, node)
                    // Link to latest node
                    this.addAll(
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
        let latest: any = [...this.latestNodes][0] ?? null;
        
        node.setPosition(
            latest?.position?.x ? latest.position.x : 100,
            latest?.position?.y ? latest.position.y + 75 : 100            
        );
    }

    smartInspectorNames(node)
    {
        if(node.options.name != 'Inspect') return;

        let nameParam = node.options.parameters.find(n => n.name == 'node_name')

        let sourceLink: any = Object.values(node.ports?.Input?.links)[0] ?? null
        if(!sourceLink) return;
        let sourcePortName = sourceLink.sourcePort.options.name ?? false
        
        // It must be a specific name to make sense
        if(!sourcePortName || sourcePortName == 'Output') return;

        nameParam.value = sourcePortName
        
    }

    getAutomatedLink(from, to) {
        if(!this.canLink(from, to)) return;

        // fromPort: prefer first unused outPort. Otherwise defaults to first
        let fromPort: any = Object.values(from.getOutPorts()).find((candidate: any) => {
            return Object.values(candidate.links).length === 0
        }) ?? Object.values(from.getOutPorts())[0]

        // toPort: the first inPort
        let toPort: any = Object.values(to.getInPorts())[0];
        
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
        let fromPort: any = Object.values(latest.getOutPorts())[0] ?? false;

        node.setPosition(
            latest.position.x + 200,
            latest.position.y + (Object.keys(fromPort.links).length) * 75
        );
    }  	
}