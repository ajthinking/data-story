import { PortId } from './types/PortId'
import { Link, LinkId } from './types/Link'
import { Node, NodeId } from './types/Node'
import { Param } from './Param'
import { PortName } from './types/Port';

export class Diagram {
  nodes: Node[]
  links: Link[]
  params: Param[]
  viewport: { x: number, y: number, zoom: number }

  constructor(options?: {
    nodes?: Node[],
    links?: Link[],
    params?: Param[],
    viewport?: { x: number, y: number, zoom: number }
  }) {
    this.nodes = options?.nodes || []
    this.links = options?.links || []
    this.params = options?.params || []
    this.viewport = options?.viewport || {
      x: 0,
      y: 0,
      zoom: 1,
    }
  }

  clone(): Diagram {
    return new Diagram({
      nodes: this.nodes.map(node => ({ ...node })),
      links: this.links.map(link => ({ ...link })),
      params: this.params.map(param => ({ ...param })),
      viewport: { ...this.viewport },
    });
  }

  add(node: Node) {
    this.nodes.push(node)

    return this
  }

  connect(link: Link) {
    this.links.push(link)

    return this
  }

  disconnect(linkId: LinkId) {
    this.links = this.links.filter(l => l.id !== linkId)

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

  linksAtInput(node: Node, name: PortName): Link[] {
    const port = node.inputs.find(input => input.name === name)!

    return this.linksAtInputPortId(port.id)
  }

  linksAtOutput(node: Node, name: PortName): Link[] {
    const port = node.outputs.find(input => input.name === name)!

    return this.linksAtOutputPortId(port.id)
  }

  getNodeIdAndPortIdFromLinkId(linkId: LinkId): { nodeId: NodeId, portId: PortId } {
    const link = this.links.find(link => link.id === linkId)

    if (!link) throw new Error(`Link with id ${linkId} not found`)

    const sourceNode = this.nodeWithOutputPortId(link.sourcePortId)
    const targetNode = this.nodeWithInputPortId(link.targetPortId)

    if (!sourceNode || !targetNode) throw new Error(`Source or target node not found for link ${linkId}`)

    return {
      nodeId: targetNode.id,
      portId: link.targetPortId,
    }
  }

  getInputLinkIdsFromNodeIdAndPortName(nodeId: NodeId, portName: PortName = 'input'): LinkId[] | undefined {
    const node = this.nodes.find(node => node.id === nodeId)
    if (!node) return;

    const port = node.inputs.find(input => input.name === portName)
    if (!port) return;

    const linkIds = this.linksAtInputPortId(port.id).map(link => link.id);
    if (!linkIds.length) return;

    return linkIds;
  }

  getOutputLinkIdsFromNodeId(nodeId: NodeId): LinkId[] {
    const node = this.nodes.find(node => node.id === nodeId)!;
    const outputIds = node.outputs.map(output => output.id);
    return this.links.filter(link => outputIds.includes(link.sourcePortId)).map(link => link.id);
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

  getAncestors(node: Node, visited: Set<Node> = new Set()): Node[] {
    const ancestorNodes: Node[] = [];
    const stack = [node];
    visited.add(node);

    while (stack.length > 0) {
      const current = stack.pop()!;
      const directAncestors = this.directAncestor(current);

      for (const ancestor of directAncestors) {
        if (!visited.has(ancestor)) {
          visited.add(ancestor);
          ancestorNodes.push(ancestor);
          stack.push(ancestor);
        }
      }
    }

    return ancestorNodes;
  }

  hasLoop(): boolean {
    return this.getLoops().length > 0
  }

  getLoopForNode(node: Node): Node[] {
    const all = this.getLoops()
    return all.find(loop => loop.includes(node))!
  }

  getLoopLinks(loop: Node[]): Link[] {
    return this.links.filter(link => {
      const sourceNode = this.nodes.find(node =>
        [...node.inputs, ...node.outputs].some(port => port.id === link.sourcePortId),
      )
      const targetNode = this.nodes.find(node =>
        [...node.inputs, ...node.outputs].some(port => port.id === link.targetPortId),
      )
      return sourceNode && targetNode && loop.includes(sourceNode) && loop.includes(targetNode)
    })
  }

  getAnscestorLinks(node: Node): Link[] {
    const ancestors = this.getAncestors(node)
    const links: Link[] = [];

    for(const ancestor of ancestors) {
      const inputPorts = ancestor.inputs;
      for(const inputPort of inputPorts) {
        const linksAtInput = this.linksAtInputPortId(inputPort.id)
        links.push(...linksAtInput)
      }
    }

    return links
  }

  getLoops(): Node[][] {
    const foundLoops = new Set<string>();
    const loops: Node[][] = [];

    for (const startNode of this.nodes) {
      const visited = new Set<Node>();
      const findLoop = (node: Node, path: Node[] = []): void => {
        if (path.includes(node)) {
          const loopStart = path.indexOf(node);
          const loopNodes = path.slice(loopStart);

          // Sort node IDs to ensure consistent order for set comparison
          const loopKey = [...loopNodes].sort((a, b) => a.id.localeCompare(b.id)).map(n => n.id).join(',');

          if (!foundLoops.has(loopKey)) {
            foundLoops.add(loopKey);
            loops.push(loopNodes);
          }
          return;
        }

        path.push(node);
        for (const ancestor of this.directAncestor(node)) {
          if (!visited.has(ancestor)) {
            visited.add(ancestor);
            findLoop(ancestor, [...path]);
          }
        }
      };

      findLoop(startNode);
    }

    return loops;
  }

  outputNodes(): Node[] {
    return this.nodes.filter(node => node.type === 'Output')
  }
}