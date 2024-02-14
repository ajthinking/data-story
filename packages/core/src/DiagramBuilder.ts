import { ComputerFactory } from './ComputerFactory';
import { Diagram } from './Diagram';
import { Node, NodeId } from './types/Node';
import { Link } from './types/Link';
import { PositionGuesser } from './PositionGuesser';
import { AbstractPort, Port, PortName } from './types/Port';
import { ComputerConfig } from './types/ComputerConfig';
import { Fake } from './computers/Fake';

export class DiagramBuilder {
  diagram: Diagram
  previousNode: Node | null = null
  fromDirective: PortName | null = null
  toDirective: PortName | null = null
  aboveDirective: NodeId | null = null
  belowDirective: NodeId | null = null

  constructor() {
    this.diagram = new Diagram([], [], {})
  }

  from(directive: string) {
    this.fromDirective = directive
    return this
  }

  above(directive: string) {
    this.aboveDirective = directive
    return this;
  }

  below(directive: string) {
    this.belowDirective = directive
    return this;
  }

  on(directive: string) {
    return this.from(directive)
  }

  to(directive: string) {
    this.toDirective = directive
    return this
  }

  // TODO continue here...
  addSubNode(name: string) {
    if(!this.diagram.nodeDefinitions[name]) throw new Error(`Bad sub node: ${name}. Node not found`)

    const subDiagram = this.diagram.nodeDefinitions[name]

    const nodeId = `${name}.${this.getScopedId(name)}`

    const node: Node = {
      id: nodeId,
      label: name,
      type: name,
      inputs: subDiagram.inputNodes().map(inputNode => {
        const port = inputNode.inputs.at(0)!

        return {
          id: `${nodeId}.${port.name}`,
          name: port.name,
          schema: port.schema,
        }
      }),
      outputs: subDiagram.outputNodes().map(outputNode => {
        const port = outputNode.outputs.at(0)!

        return {
          id: `${nodeId}.${port.name}`,
          name: port.name,
          schema: port.schema,
        }
      }),
      params: [],
    }

    node.position = new PositionGuesser(
      this.diagram
    ).guess(node)

    this.diagram.nodes.push(node)

    this.linkToNewNode(node)

    this.previousNode = node

    this.fromDirective = null

    this.aboveDirective = null

    return this
  }

  add(
    config: ComputerConfig,
    params: Record<string, any> = {},
    ports?: {
      inputs?: AbstractPort[],
      outputs?: AbstractPort[],
    }
  ) {
    const computer = new ComputerFactory().get(config)

    const nodeId = `${computer.name}.${this.getScopedId(computer.name)}`

    const node: Node = {
      id: nodeId,
      label: config.label,
      type: computer.name,
      // The inputs have not yet been assigned ids, to it here
      inputs: (ports?.inputs ?? computer.inputs ?? []).map(input => {
        return {
          ...input,
          id: `${nodeId}.${input.name}`,
        }
      }),
      // The outputs have not yet been assigned ids, to it here
      outputs: (ports?.outputs ?? computer.outputs ?? []).map(output => {
        return {
          ...output,
          id: `${nodeId}.${output.name}`,
        }
      }),
      // default params
      params: computer.params,
    }

    // set explicit params
    for(const [key, value] of Object.entries(params)) {
      const param = node.params.find(param => param.name === key)

      if(!param) throw new Error(`Bad param: ${key}. Param not found on ${node.id}`)

      param.value = value
    }

    if(this.aboveDirective) {
      const aboveNode = this.diagram.nodes.find(node => node.id === this.aboveDirective)

      if(!aboveNode) throw new Error(`Bad above directive: ${this.aboveDirective}. Node not found`)

      node.position = {
        x: aboveNode.position!.x,
        y: aboveNode.position!.y - 200,
      }
    } else if(this.belowDirective) {
      const belowNode = this.diagram.nodes.find(node => node.id === this.belowDirective)

      if(!belowNode) throw new Error(`Bad below directive: ${this.belowDirective}. Node not found`)

      node.position = {
        x: belowNode.position!.x,
        y: belowNode.position!.y + 100,
      }
    } else {
      node.position = new PositionGuesser(
        this.diagram
      ).guess(node)
    }


    this.diagram.nodes.push(node)

    this.linkToNewNode(node)

    this.previousNode = node

    this.fromDirective = null

    this.aboveDirective = null
    this.belowDirective = null

    return this
  }

  link(from: string, to: string) {
    const link: Link = {
      id: `${from}--->${to}`,
      sourcePortId: from,
      targetPortId: to,
    }

    this.diagram.links.push(link)

    return this
  }

  jiggle(jitter = {x: 50, y: 25 }) {

    for(const node of this.diagram.nodes) {
      node.position!.x += (0.5 - Math.random()) * jitter.x
      node.position!.y += (0.5 - Math.random()) * jitter.y
    }

    return this
  }

  linkByLabel(fromLabelDotOutput: string, toLabelDotInput: string) {
    const fromNode = this.diagram.nodes.find(node => node.label === fromLabelDotOutput.split('.')[0])
    const toNode = this.diagram.nodes.find(node => node.label === toLabelDotInput.split('.')[0])

    if(!fromNode) throw new Error(`Bad from label: ${fromLabelDotOutput}. Node not found`)
    if(!toNode) throw new Error(`Bad to label: ${toLabelDotInput}. Node not found`)

    const fromPort = fromNode.outputs.find(output => output.name === fromLabelDotOutput.split('.')[1])
    const toPort = toNode.inputs.find(input => input.name === toLabelDotInput.split('.')[1])

    if(!fromPort) throw new Error(`Bad from label: ${fromLabelDotOutput}. Port not found`)
    if(!toPort) throw new Error(`Bad to label: ${toLabelDotInput}. Port not found`)

    return this.link(fromPort.id!, toPort.id!)
  }

  addFake({
    label,
    inputs = [],
    outputs = [],

  }: {
    label: string,
    inputs?: string[],
    outputs?: string[],
  }) {
    return this.add({
      ...Fake,
      label,
      inputs: inputs.map((name) => ({ name, schema: { type: 'object' } })),
      outputs: outputs.map((name) => ({ name, schema: { type: 'object' } })),
    })
  }

  register(subDiagrams: Record<string, Diagram>) {
    this.diagram.nodeDefinitions = subDiagrams
    return this
  }

  get() {
    return this.diagram
  }

  protected getScopedId(computerName: string) {
    const max = this.diagram.nodes
      .filter(node => node.type === computerName)
      .map(node => node.id)
      .map(id => id.split('.')[1])
      .map(id => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1
  }

  protected linkToNewNode(newNode: Node) {
    const originPort = this.getPortToLinkTo()

    const newNodePort = this.toDirective
      ? newNode.inputs.find(input => input.name === this.toDirective)
      : newNode.inputs.at(0);

    if(!originPort || !newNodePort) return

    const link: Link = {
      id: `${originPort.id}--->${newNodePort.id}`,
      sourcePortId: originPort.id!,
      targetPortId: newNodePort.id!,
    }

    this.diagram.links.push(link)
  }

  protected getPortToLinkTo(): Port | undefined {
    if(!this.previousNode) return

    // 1. Default: First port on the most recent node
    if(!this.fromDirective) {
      return this.previousNode.outputs.at(0)
    }

    // 2. A specified port on the most recent node
    if(
      // Is a port name
      typeof this.fromDirective === 'string'
      // Is not in format "node.port"
      && !this.fromDirective.includes('.')
    ) {
      const port = this.previousNode.outputs.find(
        output => output.name === this.fromDirective
      )

      if(!port) throw new Error(`Bad on directive: ${this.fromDirective}. Port not found on ${this.previousNode.id}`)

      return port
    }

    // 3. A specified port on a specified node
    if(
      // Is a port name
      typeof this.fromDirective === 'string'
      // Is not in format "node.port"
      && this.fromDirective.includes('.')
    ) {
      const parts = this.fromDirective.split('.')

      // Node counter may be omitted - assume 1
      const [nodeType, nodeId, portName] = parts.length === 3
        ? parts
        : [parts.at(0), 1, parts.at(1)]

      const origin = this.diagram.nodes.find(
        node => node.id === `${nodeType}.${nodeId}`
      )
      if(!origin) throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin node`)

      const port = origin?.outputs.find(
        output => output.name === portName
      )

      if(!port) throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin port`)

      return port
    }

    // No port found
    return undefined
  }
}