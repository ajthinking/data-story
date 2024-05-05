import { PortId } from './types/PortId'
import { Link } from './types/Link'
import { Node } from './types/Node'
import { syncPortSchemas } from './syncPortSchemas'
import { Param } from './Param'

export type OnConnectCallbacks = (link: Link, diagram: Diagram) => void

export class Diagram {
  nodes: Node[]
  links: Link[]
  params: Param[]
  viewport: { x: number, y: number, zoom: number } = {
    x: 0,
    y: 0,
    zoom: 1
  }
  onConnect: OnConnectCallbacks[]

  constructor(options?: {
    nodes?: Node[],
    links?: Link[],
    params?: Param[],
    onConnect?: OnConnectCallbacks[],
  }) {
    this.nodes = options?.nodes || []
    this.links = options?.links || []
    this.params = options?.params || []
    this.onConnect = options?.onConnect || [
      syncPortSchemas,
    ]
  }

  add(node: Node) {
    this.nodes.push(node)

    return this
  }

  connect(link: Link) {
    this.links.push(link)

    for(const callback of this.onConnect) {
      callback(link, this)
    }

    return this
  }

  linksAtInputPortId(id: PortId | undefined): Link[] {
    return this.links.filter(link => link.targetPortId === id)
  }

  linksAtOutputPortId(id: PortId | undefined): Link[] {
    return this.links.filter(link => link.sourcePortId === id)
  }

  nodeWithInputPortId(portId: PortId): Node | undefined {
    return this.nodes.find(node => {
      return node.inputs.find(input => input.id === portId)
    })
  }

  nodeWithOutputPortId(portId: PortId): Node | undefined {
    return this.nodes.find(node => {
      return node.outputs.find(output => output.id === portId)
    })
  }

  linksAtInput(node: Node, name: string): Link[] {
    const port = node.inputs.find(input => input.name === name)!

    return this.linksAtInputPortId(port.id)
  }

  linksAtOutput(node: Node, name: string): Link[] {
    const port = node.outputs.find(input => input.name === name)!

    return this.linksAtOutputPortId(port.id)
  }

  directAncestor(node: Node): Node[] {
    const inputLinks = node.inputs.flatMap(input => this.linksAtInputPortId(input.id))
    const outputPortIds = inputLinks.map(link => link.sourcePortId)
    return outputPortIds.map(portId => this.nodeWithOutputPortId(portId)!)
  }

  directDescendant(node: Node): Node[] {
    const outputLinks = node.outputs.flatMap(output => this.linksAtOutputPortId(output.id))
    const inputPortIds = outputLinks.map(link => link.targetPortId)

    return inputPortIds.map(portId => this.nodeWithInputPortId(portId)!)
  }

  inputNodes(): Node[] {
    return this.nodes.filter(node => node.type === 'Input')
  }

  outputNodes(): Node[] {
    return this.nodes.filter(node => node.type === 'Output')
  }
}