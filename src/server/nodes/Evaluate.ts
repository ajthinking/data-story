import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class Evaluate extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = "Evaluate javascript"

    async run() {
        const expression = this.getParameterValue('expression');

        this.output(
            this.input().map(feature => {
                eval(expression)
                return feature
            })
        );
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('expression').withFieldType('JS'),            
        )

        return description
    }    
}