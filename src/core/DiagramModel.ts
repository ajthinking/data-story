import { DiagramModel as DefaultDiagramModel } from '@projectstorm/react-diagrams'
import NodeModel from './NodeModel'
import { SerializedDiagramModel } from './types/SerializedDiagramModel'
import VERSION from './utils/version'

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
}