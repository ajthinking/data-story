import Feature from "../../../core/Feature";
import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class CreateJSON extends ServerNode {
    public static category: string = 'Reader'    
    public static inPorts: Array<String> = []
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
            {
                default: '[{ "resource": "todos"}]',
                fieldType: "JSON_",
                name: "features",
                value: '[{ "resource": "todos"}]',
            }            
        )

        return description
    }    
}