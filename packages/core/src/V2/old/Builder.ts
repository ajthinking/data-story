import { Diagram } from '../../Diagram';
import { Param, ParamValue } from '../../Param';
import { Link } from '../../types/Link';
import { Node } from '../../types/Node';
import { AbstractPort } from '../../types/Port';
import { Element } from './Element';

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
  | Omit<Partial<Element>, 'params'> | ParamConfig

export class Builder {
  private nodes: Node[] = []
  private links: Link[] = []
  private elementIdCounters: Record<string, number> = {}

  constructor(private availableElements: Element[]) {}

  add(elementName: string, config?: AddNodeConfig) {
    const template = this.availableElements.find(e => e.name === elementName)

    // Ensure the element exists
    if (!template) throw new Error(`Element ${elementName} not found`)

    const { boot, ...cloneables } = template;
    this.addElement({
      ...structuredClone(cloneables),
      boot,
    }, config)

    return this
  }

  private addElement(element: Element, config: AddNodeConfig) {
    const node = this.elementToNode(element)

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

  private elementToNode(element: Element): Node {
    if (!this.elementIdCounters[element.name]) {
      this.elementIdCounters[element.name] = 1;
    } else {
      this.elementIdCounters[element.name]++;
    }

    const elementId = `${element.name}.${this.elementIdCounters[element.name]}`

    return {
      id: elementId,
      type: element.name,
      inputs: element.inputs.map(i => ({
        id: `${elementId}.${(i as string)}`,
        name: typeof i === 'string'
          ? i
          : i.name,
        schema: {},

      })),
      outputs: element.outputs.map(o => ({
        id: `${elementId}.${(o as string)}`,
        name: typeof o === 'string'
          ? o
          : o.name,
        schema: {},
      })),
      params: element.params,
    }
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
}