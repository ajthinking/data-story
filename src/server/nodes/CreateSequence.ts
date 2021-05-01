import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateSequence extends ServerNode {
    public category: string = 'Reader'    
    public inPorts: string[] = []
    public summary = 'Create a sequence of objects'    
	name = 'CreateSequence'

    async run() {
        let count = parseInt(this.getParameterValue('number_of_features_to_create'))

        this.output(
            Array.from(Array(count).keys()).map(i => {
                return new Feature({ creation_id: i})
            })
        );       
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.number('number_of_features_to_create').withValue(10),
		]
	}	
}