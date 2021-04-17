import Feature from "../../core/Feature";
import { NodeDescription } from "../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class CreateSequence extends ServerNode {
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
            {
                fieldType: "Number",
                name: "number_of_features_to_create",
                value: 10,
            }            
        )

        return description
    }    
}