import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class CreateAttribute extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Workflow'    
    public static summary = 'Create a new attribute from an expression'    

    async run() {
        let attribute = this.getParameterValue('attribute')
        let value = this.getParameterValue('value')

        console.log(this)

        this.output(
            this.input().map(feature => feature.set(attribute, value))
        );       
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('attribute'),
            NodeParameter.make('value'),                                   
        )

        return description
    }    
}