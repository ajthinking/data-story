import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class Evaluate extends ServerNode {
    category: string = 'Workflow'    
    summary = "Evaluate javascript"
	name = 'Evaluate'

    async run() {
        const expression = this.getParameterValue('expression');

        this.output(
            this.input().map(feature => {
                eval(expression)
                return feature
            })
        );
    }
	
	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.js('expression')
		]
	}		
}