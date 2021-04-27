import { NodeModel as DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BasePositionModelOptions } from '@projectstorm/react-canvas-core';
import PortModel from './PortModel'
import _ from 'lodash'
import UID from './utils/UID'

export interface NodeModelOptions extends BasePositionModelOptions {
    name: string,
    inPorts: any[],
    outPorts: any[],
    parameters: any[],
}

export default class NodeModel extends DefaultNodeModel {
    options: NodeModelOptions
    parent: any
    features: []

	constructor(options) {
		super({
			...options,
            type: 'NodeModel',
            // Make id easier on humans
            id: `Node_${options.name}_${options.serial}_${UID()}`
        });

        this.options.inPorts.forEach(name => {
            this.addPort(
                new PortModel({
                    in: true,
                    name: name,
                    parent: this,
                })
            );  
        })

        this.options.outPorts.forEach(name => {
            this.addPort(
                new PortModel({
                    in: false,
                    name: name,
                    parent: this,                    
                })
            );  
        })
    }

	serialize() {
		return {
            ...super.serialize(),
            options: this.options,
            incomingPortOrigins: this.incomingPortOrigins()
		};
    }

    parameter(name) {
        return this.options.parameters.find((parameter) => {
            return parameter.name == name
        })
    }

    getDisplayName() {
        return this.parameter('node_name').value
    }

    getDiagramModel() {
        return this.parent.parent
    }

    getInPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return port.options.in
        });
    }

    getOutPorts() {
        return _.pickBy(this.getPorts(), function(port, key) {
            return !port.options.in
        });        
    }

    incomingPortOrigins() {
        return Object.values(this.getInPorts()).reduce((origins, port: any) => {
            origins[port.options.id] = Object.values(port.links).map((link:any) => link.sourcePort.options.id)
            return origins
        }, {})
    }
    
    dependencies() {
        let cached = this.getDiagramModel().getCachedNodeDependencies(this.options.id)
        if(cached !== null) {
            return cached;
        }

        let inPorts = Object.values(this.getInPorts())
        let linkLists = inPorts.map((port: any) => port.links).flat()
        let links = linkLists.map(linkList => Object.values(linkList)).flat()

        let dependencies = links.map((link: any) => link.sourcePort.parent)

        let deepDependencies = dependencies.map(d => d.dependencies())

        let result = dependencies.concat(deepDependencies.flat())

        this.getDiagramModel().setCachedNodeDependencies(this.options.id, result)

        return result
    }

    dependsOn(n2) {
        return this.dependencies().map(d => d.options.id).includes(n2.options.id)
    }

    isInspectable() {
        return Boolean(this.features)
    }
}