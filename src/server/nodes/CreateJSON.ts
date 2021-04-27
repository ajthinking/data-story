import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class CreateJSON extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Reader'    
    public static inPorts: string[] = []
    public static summary = 'Create features from JSON'    

    async run() {
        this.output(
            JSON.parse(this.getParameterValue('features'))
                .map(item => new Feature(item))
        );
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('features')
                .withFieldType("JSON_")
                .withValue('[{ "resource": "todos"}]'),            
        )

        return description
    }    
}