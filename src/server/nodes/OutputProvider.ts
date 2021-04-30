import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import Feature from "../../core/Feature";

export default class OutputProvider extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Provides output ports from JSON'
	inPorts = []
	outPorts = []	
	editableOutPorts = true;
	name = 'OutputProvider'

    async run() {
        const outputs = this.getParameterValue('outputs')

		for(const {key, value} of outputs) {
			this.output(key, value.map(v => new Feature(v)))
		}
    }

    serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('outputs')
                .withFieldType("JSON_")
                .withValue(JSON.stringify({
					o1: [1,2,3],
					o2: [4,5,6],
				}, null, 4)),
        )

        return description
    }        
}