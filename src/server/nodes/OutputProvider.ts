import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import { NodeDescription } from "../../core/NodeDescription";
import Feature from "../../core/Feature";

export default class OutputProvider extends ServerNode {
    public static category: string = 'Workflow'    
    public static summary = 'Provides distinct output ports with test data'
	public static inPorts = []

    async run() {
        const outputs = this.getParameterValue('outputs')

		for(const {key, value} of outputs) {
			this.output(key, value.map(v => new Feature(v)))
		}
    }

    static describe() : NodeDescription {
        let description = super.describe()

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