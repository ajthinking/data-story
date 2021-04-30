import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class CreateJSON extends ServerNode {
    public category: string = 'Reader'    
    public inPorts: string[] = []
    public summary = 'Create features from JSON'    
	name = 'CreateJSON'

    async run() {
        this.output(
            JSON.parse(this.getParameterValue('features'))
                .map(item => new Feature(item))
        );
    }

 	serialize() {
        let description = super.serialize()

        description.parameters.push(
            NodeParameter.make('features')
                .withFieldType("JSON_")
                .withValue('[{ "resource": "todos"}]'),            
        )

        return description
    }    
}