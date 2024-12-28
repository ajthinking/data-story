import { Diagram } from './Diagram';
import { Param, ParamValue, StringableInputValue } from './Param';
import { Computer } from './types/Computer';
import { Node } from './types/Node';
import { NodeDescription } from './types/NodeDescription';

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

export class DiagramBuilderV3 {
  private diagram = new Diagram()

  constructor(private nodeDescriptions: NodeDescription[]) {}

  add(nodeName: string, config?: AddNodeConfig) {
    const description = this.nodeDescriptions.find(e => e.name === nodeName)

    if (!description) throw new Error(`Description for a Node ${nodeName} not found`)

    this.addNodeFromDescription(description, config)

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

  connect(connections? : string | [fromPortId: string, toPortId: string][]) {
    if(!connections) return this.guessConnections()
    if(typeof connections === 'string') return this.connectByString(connections)

    return this.connectByArray(connections)
  }

  connectByArray(connections: [fromPortId: string, toPortId: string][]) {
    for(const [fromPortId, toPortId] of connections) {
      console.log({ fromPortId, toPortId })
      const sourceNode = this.diagram.nodes.find(n => n.outputs.some(o => o.id === fromPortId))
      const targetNode = this.diagram.nodes.find(n => n.inputs.some(i => i.id === toPortId))

      if(!sourceNode || !targetNode) {
        console.log({
          sourceNode,
          targetNode,
          connections
        })
        throw new Error('Source or target node not found')
      }

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
      .map(line => {
        const afterClenup = line.replace(/\s+/g, '')
        console.log({ afterClenup })
        return afterClenup
      })
    // Split by arrows of any length
      .map(line => line.split(/-+>/))
    // Ensure two parts or throw
      .map((parseInt) => {
        const [from, to, rest] = parseInt
        if (!from || !to) throw new Error(`Invalid line connection string: \n${connections}\nCould not resolve from & to parts.`);
        if(rest) throw new Error(`Invalid line connection string: \n${connections}\nToo many parts.`);

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

  jiggle(jitter = {x: 50, y: 25 }) {
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
      type: nodeDescription.name,
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
      console.log({ key, value })
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

      console.log({ param2: structuredClone(param) })

      // if(Array.isArray(value)) {
      //   param.value = value
      //   continue
      // }

      if(typeof value === 'object') {
        param = {
          ...param,
          value: {
            ...(param.value as Object),
            ...value
          }
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
      .filter(node => node.type === nodeName)
      .map(node => node.id)
      .map(id => id.split('.')[1])
      .map(id => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1
  }
}