import { NodeDescription } from "../../core/NodeDescription";
import ServerDiagram from "./ServerDiagram";

export default class ServerNode {
    public id: string
    public ports: Array<any>
    public diagram: ServerDiagram

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

    constructor(diagram) {
        this.diagram = diagram
    }

    static hydrate(data, diagram) {
        let instance = new this(diagram)

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

    protected input(portName: string = 'Input')
    {
        return this.getDataAtPortNamed(portName);
    }

    protected getDataAtPortNamed(name: string = 'Input')
    {
       let port = this.portNamed(name);

        let features = port.links.map(linkId => {
            let link = this.diagram.find(linkId)
            console.log("Scanning data at " + link.sourcePort)
            let source = this.diagram.find(link.sourcePort)
            return source.features
        }).flat()

        return features
    }    

    protected output(features: Array<any>, port: string = 'Output') {
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