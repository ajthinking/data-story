import { NodeDescription } from "../core/NodeDescription";
import ServerDiagram from "./ServerDiagram";
import * as _ from "lodash";
import Feature from "../core/Feature";
import UID from "../core/utils/UID";

export default class ServerNode {
    public id: string
    public ports: any[]
    public diagram: ServerDiagram
    public options: any

    public static category: string = 'Custom'
    public static editableInPorts: boolean = false
    public static editableOutPorts: boolean = false
    public static inPorts: string[] = ['Input']
    public static outPorts: string[] = ['Output']
    public static key: string = 'test-key'
    public static name_: string
    public static serverNodeType: string
    public static nodeReact: string = 'Node'
    public static parameters: any[]
    public static summary: string = 'No summary provided.'   

    constructor(diagram, description: any = {}) {
        this.diagram = diagram
        this.id = UID()

        this.options = {
            parameters: description.parameters
        }
        if(!description.outPorts) return
        this.ports = description.outPorts.map(portName => {
            return {
                name: portName,
                in: false
            }
        })
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
                    fieldType: "String_",
                    name: "node_name",
                    placeholder: "",
                    value: this.name,
                }
            ],
            summary: this.summary,
        })
    }

    protected getParameter(name: string) {
        return this['options'].parameters.find(p => p.name == name)
    }

    protected getParameterValue(name: string, feature: Feature = null) {

        let value = this.getParameter(name).value

        if(!feature) return value

        return this.interpretParameterValue(value, feature)
    }

    protected interpretParameterValue(parametric, feature) {
        let matches = parametric.match(/\{\{[\.a-zA-Z\s_]*\}\}/g)
        if(matches) {

            for(let match of matches) {
                let originalMatch = match

                let parts = match.replace('{{', '')
                    .replace('}}', '')
                    .trim()
                    .split('.')
                
                parts.shift() // Remove 'feature'

                let interpreted = parts.reduce((carry, property) => {
                    return carry[property]
                }, feature.original)

                parametric = parametric.replace(originalMatch, interpreted)
            }
        }

        return parametric
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
            let source = this.diagram.find(link.sourcePort)
            return source.features
        }).flat()
        
        return _.cloneDeep(features)
    }    

    protected output(features: any[], port: string = 'Output') {
        this.portNamed(port).features = this.portNamed(port).features ? features.concat(features) : features
    }

    protected portNamed(name: string) {
        return this.ports.find(port => port.name == name)
    }
}