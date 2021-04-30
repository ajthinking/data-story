import DiagramModel from "./DiagramModel"
import NodeModel from "./NodeModel"

export class DiagramModelBuilder {

	currentNode?: NodeModel
	diagram?: DiagramModel

	static begin() {
		return new this
	}

	addNode(nodeClass) {
		let diagram = this.getDiagram()

		let node = new NodeModel(
			nodeClass.describe()
		)

		diagram.addNode(node)

		this.diagram = diagram

		this.currentNode = node

		return this
	}

	then() {
		this.commitNode()
		return this
	}

	connectNode() {
		return this
	}

	finish() {
		return this.getDiagram()
	}

	protected commitNode() {
		if(this.currentNode === null) return
		
		this.diagram.addNode(this.currentNode)
		this.currentNode = null;
	}

	protected getDiagram() {
		return this.diagram ?? new DiagramModel()
	}
}