import NodeParameter from "../../core/NodeParameter";
import ServerNode from "../ServerNode";

export default class ThrowError extends ServerNode {
    category: string = 'Workflow'    
    summary = 'Throws an error'
	outPorts = []
	name = 'ThrowError'

    async run() {
        if(this.input().length) throw Error(
			this.getParameterValue('error_message')
		)
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.string('error_message').withValue('Something went wrong!'),
		]
	}	
}