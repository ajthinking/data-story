import Feature from "../../core/Feature";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";

export default class CreateJSON extends ServerNode {
    public category: string = 'Reader'    
    public inPorts: string[] = []
    public summary = 'Create features from JSON'    
	public name = 'CreateJSON'

    async run() {
        this.output(
            JSON.parse(this.getParameterValue('features'))
                .map(item => new Feature(item))
        );
    }

	getParameters() {
		return [
			...super.getParameters(),
            NodeParameter.json('features').withValue('[{ "resource": "todos"}]'),            
		]
	}	
}