import { NodeDescription } from "../../core/NodeDescription";

export default class ServerNode {
    public id: string
    public ports: Array<any>

    public static category: string = 'Custom'
    public static editableInPorts: boolean = false
    public static editableOutPorts: boolean = false
    public static inPorts: Array<String> = ['Input']
    public static outPorts: Array<String> = ['Output']
    public static key: string = 'test-key'
    public static name_: string
    public static serverNodeType: string
    public static nodeReact: string = 'Node'
    public static parameters: Array<any>
    public static summary: string = 'No summary provided.'   

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
            editableInPorts: this.editableInPorts,
            editableOutPorts: this.editableOutPorts,
            inPorts: this.inPorts,
            outPorts: this.outPorts,
            key: this.key,
            name: this.name,
            nodeReact: this.nodeReact,
            serverNodeType: this.name,
            parameters: [
                {
                    default: this.name,
                    fieldType: "String_",
                    name: "node_name",
                    placeholder: "",
                    value: this.name,
                }
            ],
            summary: this.summary,
        })
    }

    protected input() {

    }

    protected output(features: Array<any>, port: string = 'Output') {
        console.log("OUTPUT")
        this.portNamed(port).features = features
    }

    protected portNamed(name: string) {
        console.log(
            name,
            this.ports,
            this.ports.find(port => port.name == name)
        )
        return this.ports.find(port => port.name == name)
    }
}