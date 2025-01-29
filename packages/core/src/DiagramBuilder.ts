import { Diagram } from './Diagram';
import { Param, ParamValue, StringableInputValue } from './Param';
import { Computer } from './types/Computer';
import { Node } from './types/Node';
import { NodeDescription } from './types/NodeDescription';
import { PortId } from './types/PortId';
import { isStringableParam } from './utils/isStringableParam';

// type ParamConfig = Record<string, ParamValue> | Partial<Param>
type ParamConfig = {
  [paramName: string]: (
    | ParamValue
    | Partial<Param>
    | Record<string, ParamValue & Partial<Param>>
    | any // TODO ¯\_(ツ)_/¯
  )
}
type AddNodeConfig =
  undefined
  | Omit<Partial<Computer>, 'params'> | ParamConfig

export class DiagramBuilder {
  private diagram = new Diagram()

  constructor(private nodeDescriptions: NodeDescription[]) {}

  add(nodeName: string, config?: AddNodeConfig) {
    const description = this.nodeDescriptions.find(e => e.name === nodeName)

    if (!description) throw new Error(`Description for a Node ${nodeName} not found`)

    this.addNodeFromDescription(description, config)

    return this
  }

  addNestedNode(name: string, diagram: Diagram, params: Record<string, any> = {}) {
    const nodeId = `${name}.${this.getScopedId(name)}`

    const node: Node = {
      id: nodeId,
      label: name,
      name: name,
      // The inputs have not yet been assigned ids, to it here
      inputs: diagram.inputNodes().map(inputNode => {
        const param = inputNode.params.find(param => param.name === 'port_name');
        const inputName = isStringableParam(param?.type) ? (param?.value as StringableInputValue).value : param?.value as string

        return {
          name: inputName,
          id: `${nodeId}.${inputName}`,
          schema: {},
        }
      }),
      // The outputs have not yet been assigned ids, to it here
      outputs: diagram.outputNodes().map(outputNode => {
        const param = outputNode.params.find(param => param.name === 'port_name');
        const outputName = isStringableParam(param?.type) ? (param?.value as StringableInputValue).value : param?.value as string

        return {
          name: outputName,
          id: `${nodeId}.${outputName}`,
          schema: {},
        }
      }),
      // default params
      params: diagram.params,
      position: { x: 0, y: 0 },
    }

    // set explicit params
    for(const [key, value] of Object.entries(params)) {
      const param = node.params.find(param => param.name === key)

      if(!param) throw new Error(`Bad param: ${key}. Param not found on ${node.id}`)

      param.value = isStringableParam(param.type) ? { ...(param.value as StringableInputValue ?? {}), value } : value;
    }

    this.diagram.nodes.push(node)

    return this
  }

  place() {
    // Configuration for layout, adjust as needed
    const nodeWidth = 150;
    const nodeHeight = 100;
    const padding = 50;

    // Determine grid layout
    let x = padding;
    let y = padding;

    this.diagram.nodes.forEach((node, index) => {
      // Place the node in a grid-like structure
      node.position!.x = node.position!.x ? node.position!.x : x;
      node.position!.y = node.position!.y ? node.position!.y : y;

      // Move to the next column
      x += nodeWidth + padding;

      // Wrap to the next row if necessary
      if ((index + 1) % 5 === 0) { // 5 nodes per row, adjust as needed
        x = padding;
        y += nodeHeight + padding;
      }
    });

    return this;
  }

  connect(connections? : string | [fromPortId: PortId, toPortId: PortId][]) {
    if(!connections) return this.guessConnections()
    if(typeof connections === 'string') return this.connectByString(connections)

    return this.connectByArray(connections)
  }

  withParams(params: Param[]) {
    this.diagram.params = params

    return this
  }

  connectByArray(connections: [fromPortId: PortId, toPortId: PortId][]) {
    for(const [fromPortId, toPortId] of connections) {
      const sourceNodeId = fromPortId.split('.').slice(0, -1).join('.');
      const targetNodeId = toPortId.split('.').slice(0, -1).join('.');

      const sourceNode = this.diagram.nodes.find(n => n.id === sourceNodeId)
      const targetNode = this.diagram.nodes.find(n => n.id === targetNodeId)

      if(!sourceNode) throw new Error(`Source node with id ${sourceNodeId} not found`)
      if(!targetNode) throw new Error(`Target node with id ${targetNodeId} not found`)

      const sourcePort = sourceNode.outputs.find(o => o.id === fromPortId)
      const targetPort = targetNode.inputs.find(i => i.id === toPortId)

      if(!sourcePort) throw new Error(`Source port with id ${fromPortId} not found`)
      if(!targetPort) throw new Error(`Target port with id ${toPortId} not found`)

      const link = {
        id: `${sourceNode.id}--->${targetNode.id}`,
        sourcePortId: fromPortId,
        targetPortId: toPortId,
      }

      this.diagram.links.push(link)
    }

    return this
  }

  connectByString(connections: string) {
    const parsed: [from: string, to: string][] = connections
    // Process line by line
      .split('\n')
    // Remove empty lines
      .map(line => line.trim()).filter(Boolean)
    // Remove whitespace and "|"
      .map(line => line.replace(/\s+/g, ''))
    // Split by arrows of any length
      .map(line => line.split(/-+>/))
    // Ensure two parts or throw
      .map((parts) => {
        const [from, to, rest] = parts

        if (!from || !to) throw new Error(`Invalid line connection string: \n${connections}\nCould not resolve from & to parts.`);
        if(rest) throw new Error(`Invalid line connection string: \n${connections}\nToo many parts.`);

        return [from, to]
      })
    // Ensure correct format
      .map(([from, to]) => {
        const fromParts = from.split('.')
        const toParts = to.split('.')

        if(fromParts.length !== 3) throw new Error(`Invalid line connection string: \n${connections}. Use format: <NodeName>.<Count>.<PortName>.`);
        if(toParts.length !== 3) throw new Error(`Invalid line connection string: \n${connections}. Use format: <NodeName>.<Count>.<PortName>.`);

        return [from, to]
      })

    return this.connectByArray(parsed)
  }

  guessConnections() {
    for (let i = 0; i < this.diagram.nodes.length - 1; i++) {
      const current = this.diagram.nodes[i]
      const next = this.diagram.nodes[i + 1]

      if (current.outputs.length === 0 || next.inputs.length === 0) {
        continue
      }

      const firstOutput = current.outputs[0]
      const firstInput = next.inputs[0]

      const link = {
        id: `${current.id}--->${next.id}`,
        sourcePortId: firstOutput.id,
        targetPortId: firstInput.id,
      }

      this.diagram.links.push(link)
    }

    return this
  }

  jiggle(jitter = { x: 50, y: 25 }) {
    for(const node of this.diagram.nodes) {
      node.position!.x += (0.5 - Math.random()) * jitter.x
      node.position!.y += (0.5 - Math.random()) * jitter.y
    }

    return this
  }

  get(): Diagram {
    return this.diagram
  }

  private nodeDescriptionToDiagramNode(nodeDescription: NodeDescription): Node {
    const id = `${nodeDescription.name}.${this.getScopedId(nodeDescription.name)}`;

    return structuredClone({
      id,
      name: nodeDescription.name,
      label: nodeDescription.label,
      inputs: nodeDescription.inputs.map(input => {
        return {
          id: `${id}.${input.name}`,
          name: input.name,
          schema: input.schema,
        }
      }),
      outputs: nodeDescription.outputs.map(output => {
        return {
          id: `${id}.${output.name}`,
          name: output.name,
          schema: output.schema,
        }
      }),
      params: nodeDescription.params || [],
      position: { x: 0, y: 0 },
    })
  }

  private addNodeFromDescription(nodeDescription: NodeDescription, config: AddNodeConfig) {
    const node = this.nodeDescriptionToDiagramNode(nodeDescription)

    if(!config) {
      this.diagram.nodes.push(node)
      return this
    }

    for(const [key, value] of Object.entries(config)) {
      // ****************************************************
      // Special case for label
      // ****************************************************
      if(key === 'label') {
        node.label = value
        continue
      }

      // ****************************************************
      // Special case for position
      // ****************************************************
      if(key === 'position') {
        node.position = value
        continue
      }

      let param = node.params.find(p => p.name === key)
      if(!param) throw new Error(`Param ${key} not found`)

      if(typeof value === 'object') {
        param = {
          ...param,
          value: {
            ...(param.value as Object),
            ...value,
          },
        }
        continue
      }

      // Default
      (param.value as StringableInputValue).value = value
    }

    this.diagram.nodes.push(node)
  }

  protected getScopedId(nodeName: string) {
    const max = this.diagram.nodes
      .filter(node => node.name === nodeName)
      .map(node => node.id)
      .map(id => id.split('.')[1])
      .map(id => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1
  }
}