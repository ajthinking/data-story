import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";
import NodeParameter from "../../core/NodeParameter";
import ServerNodeInterface from "../ServerNodeInterface";

export default class CreateSequence extends ServerNode implements ServerNodeInterface {
    public static category: string = 'Reader'    
    public static inPorts: string[] = []
    public static summary = 'Create a sequence of objects'    

    async run() {
        let count = parseInt(this.getParameterValue('number_of_features_to_create'))

        this.output(
            Array.from(Array(count).keys()).map(i => {
                return new Feature({ creation_id: i})
            })
        );       
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            NodeParameter.make('number_of_features_to_create').withFieldType("Number").withValue(10),
        )

        return description
    }    
}