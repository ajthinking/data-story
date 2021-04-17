import { DiagramModel as DefaultDiagramModel } from '@projectstorm/react-diagrams'

/**
 * Sorts model in execution order based on their dependencies
 * Can attach data to links
 */
export default class DiagramModel extends DefaultDiagramModel {

    cachedNodeDependencyMap = {
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

    serialize() {
        // The default react-diagrams format
        let layered = super.serialize();

        let simplified = {
            // Default serialization
            ...layered,
            // Provide links and nodes as simple arrays
            links: Object.values(layered.layers[0].models),
            nodes: Object.values(layered.layers[1].models),
            executionOrder: this.executionOrder()
                .map(node => node.getOptions().id)             
        }

        // Cleanup unused keys
        delete simplified.layers

        return simplified
    }

    // is this working???
    deserializeModel(data, engine) {

        // Restore the default react-diagrams layer format
        data.layers = [
            {
                "id": "diagram-links-layer",
                "type": "diagram-links",
                "isSvg": true,
                "transformed": true,
                "models": data.links
            },
            {
                "id": "diagram-nodes-layer",
                "type": "diagram-nodes",
                "isSvg": false,
                "transformed": true,
                "models": data.nodes
            }            
        ]

        // Cleanup unused keys
        delete data.links
        delete data.nodes

        super.deserializeModel(data, engine)
    }

    hasNode(node) {
        return Boolean(
            node?.options?.id &&
            this.getNode(node.options.id)
        )        
    }

    executionOrder() {
        this.clearCachedNodeDependencies();

        return this.getNodes().sort(function(n1, n2) {

            if ((n2 as any).dependsOn(n1)) {
                return -1;
            }

            if ((n1 as any).dependsOn(n2)) {
              return 1;
            }

            return 0;
          });
    }
}