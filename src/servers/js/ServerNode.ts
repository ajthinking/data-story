import { NodeDescription } from "../../core/NodeDescription";

export default class ServerNode {
    public id: string
    public static category: string
    public editableInPorts: boolean
    public editableOutPorts: boolean
    public inPorts: Array<String> = []
    public outPorts: Array<String> = []
    public key: string = 'test-key'
    public name: string = 'Create'
    public serverNodeType: string = 'Create'
    public nodeReact: string = 'Node'
    public parameters: Array<any>
    public summary: string    

    static hydrate(data) {
        let instance = new this()

        for (const [key, value] of Object.entries(data)) {
            instance[key] = value
        }        

        return instance
    }

    static describe() : NodeDescription {
        return NodeDescription.deserialize({
            category: this.category,
            editableInPorts: false,
            editableOutPorts: false,
            inPorts: [],
            outPorts: ['Output'],
            key: 'test-key',
            name: 'Create',
            nodeReact: 'Node',
            serverNodeType: 'Create',
            parameters: [
                {
                    default: "Create",
                    fieldType: "String_",
                    name: "node_name",
                    placeholder: "",
                    value: "Create",
                }
            ],
            summary: 'ajthinking is learning typescript',
        })
    }
}