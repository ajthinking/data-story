import { ComputerFactory } from './ComputerFactory';
import { Diagram } from './Diagram';
import { Param, ParamValue } from './Param';
import { Computer } from './types/Computer';
import { Link } from './types/Link';
import { Node } from './types/Node';

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
  private nodes: Node[] = []
  private links: Link[] = []
  private computerIdCounters: Record<string, number> = {}

  constructor(private computers: Computer[]) {}

  add(computerName: string, config?: AddNodeConfig) {
    const template = this.computers.find(e => e.name === computerName)

    // Ensure the computer config exists
    if (!template) throw new Error(`Computer config ${computerName} not found`)

    this.addNode(
      new ComputerFactory().getInstance(template),
      config
    )

    return this
  }

  connect(connections? : string | [fromPortId: string, toPortId: string][]) {
    if(!connections) return this.guessConnections()
    if(typeof connections === 'string') return this.connectByString(connections)

    return this.connectByArray(connections)
  }

  connectByArray(connections: [fromPortId: string, toPortId: string][]) {
    for(const [fromPortId, toPortId] of connections) {
      const sourceNode = this.nodes.find(n => n.outputs.some(o => o.id === fromPortId))
      const targetNode = this.nodes.find(n => n.inputs.some(i => i.id === toPortId))

      if(!sourceNode || !targetNode) {
        throw new Error('Source or target node not found')
      }

      const link = {
        id: `${sourceNode.id}--->${targetNode.id}`,
        sourcePortId: fromPortId,
        targetPortId: toPortId,
      }

      this.links.push(link)
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
      .map(line => line.replace(/\s*\|\s*/, ''))
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
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const current = this.nodes[i]
      const next = this.nodes[i + 1]

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

      this.links.push(link)
    }

    return this
  }

  get(): Diagram {
    return new Diagram({
      nodes: this.nodes,
      links: this.links,
    })
  }

  private addNode(computer: Computer, config: AddNodeConfig) {
    const node = this.computerToNode(computer)

    if(!config) {
      this.nodes.push(node)
      return this
    }

    for(const [key, value] of Object.entries(config)) {
      if(key === 'label') {
        node.label = value
        continue
      }

      let param = node.params.find(p => p.name === key)
      if(!param) throw new Error(`Param ${key} not found`)

      if(Array.isArray(value)) {
        param.value = value
        continue
      }

      if(typeof value === 'object') {
        param = { ...param, ...value}
        continue
      }

      // Default
      param.value = value
    }

    this.nodes.push(node)
  }

  private computerToNode(computer: Computer): Node {
    if (!this.computerIdCounters[computer.name]) {
      this.computerIdCounters[computer.name] = 1;
    } else {
      this.computerIdCounters[computer.name]++;
    }

    const nodeId = `${computer.name}.${this.computerIdCounters[computer.name]}`

    return {
      id: nodeId,
      type: computer.name,
      inputs: computer.inputs.map(i => ({
        id: `${nodeId}.${(i as unknown as string)}`,
        name: typeof i === 'string'
          ? i
          : i.name,
        schema: {},
      })),
      outputs: computer.outputs.map(o => ({
        id: `${nodeId}.${(o as unknown as string)}`,
        name: typeof o === 'string'
          ? o
          : o.name,
        schema: {},
      })),
      params: computer.params,
      position: {
        x: 0,
        y: 0,
      }
    }
  }
}