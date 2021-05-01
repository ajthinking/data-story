import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateAttribute extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Create a new attribute from an expression'    
	name = 'CreateAttribute'

    async run() {
        let attribute = this.getParameterValue('attribute')
        let value = this.getParameterValue('value')

        this.output(
            this.input().map(feature => feature.set(attribute, value))
        );       
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('attribute'),
            NodeParameter.string('value'),              
		]
	}	
}