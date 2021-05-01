import ServerDiagram from "./ServerDiagram";
import * as _ from "lodash";
import Feature from "../core/Feature";
import UID from "../core/utils/UID";
import NodeParameter from "../core/NodeParameter";

type ServerNodeOptions = {
	diagram?: ServerDiagram,
	parameters?: object[],
	inPorts?: string[],
	outPorts?: string[],
	name?: string,
	id?: string,
	options?: any,
}

export default abstract class ServerNode {
    public id: string
    public ports: any[]
    public diagram: ServerDiagram
    public options: any

    public category: string = 'Custom'
    public editableInPorts: boolean = false
    public editableOutPorts: boolean = false
    public inPorts: string[] = ['Input']
    public outPorts: string[] = ['Output']
    public key: string = 'test-key'
    public name: string
    public serverNodeType: string
    public nodeReact: string = 'Node'
    public parameters: any[]
    public summary: string = 'No summary provided.'

    abstract run(): any;

    constructor(options: ServerNodeOptions = {}) {
        this.diagram = options.diagram
		
        this.id = options.id ?? UID()
        this.parameters = options.parameters ? options.parameters : []
        this.ports = this.createPorts(options)
    }

	createPorts(options) {
		return options.ports ?? [
            ...(options.inPorts ?? []).map(portName => {
                return {
                    name: portName,
                    in: true
                }
            }),
            ...(options.outPorts ?? []).map(portName => {
                return {
                    name: portName,
                    in: false
                }
            }),            
        ]
	}

	serialize() {
		return {
            category: this.category,
            editableInPorts: this.editableInPorts,
            editableOutPorts: this.editableOutPorts,
            inPorts: [...this.inPorts],
            outPorts: [...this.outPorts],
            key: this.key,
            name: this.name,
            nodeReact: this.nodeReact,
            serverNodeType: this.name,
            parameters: this.getParameters(),
            summary: this.summary,			
		}
	}

	getParameters() {
		return [
			NodeParameter.string('node_name').withValue(this.name)
		]
	}

    protected getParameter(name: string) {
        return this.parameters.find(p => p.name == name)
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
            return source.features ?? []
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