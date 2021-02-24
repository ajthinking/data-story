import { NodeDescription } from "../../../core/NodeDescription";
import ServerNode from "../ServerNode";

export default class Create extends ServerNode {
    public static inPorts: Array<String> = []

    run() {
        let count = parseInt(this.getParameter('number_of_features_to_create').value)

        console.log('count', count);

        let features = Array.from(Array(count).keys())
        console.log('features', features)
        this.output(
            features.map(i => {
                return { creation_id: i}
            })
        );
    }

    static describe() : NodeDescription {
        let description = super.describe()

        description.parameters.push(
            {
                default: 10,
                fieldType: "Number",
                name: "number_of_features_to_create",
                value: 10,
            }            
        )

        return description
    }    
}