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
  )
}
type AddNodeConfig =
  undefined
  | Omit<Partial<Element>, 'params'> | ParamConfig

// NOTHING
const i0: AddNodeConfig = undefined

// EXPLICIT NO PARAMS
const i1: AddNodeConfig = {
  label: 'Creator',
  params: []
}

const i: AddNodeConfig = {
  delay: String(1000),
  label: 'My Creator',
}

export class Builder {
  private nodes: Node[] = []
  private links: Link[] = []

  constructor(private availableElements: Element[]) {}

  add(elementName: string, config?: AddNodeConfig) {
    const template = this.availableElements.find(e => e.name === elementName)

    // Ensure the element exists
    if (!template) throw new Error(`Element ${elementName} not found`)

    this.addElement(template, config)

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
    const elementId = `${element.name}.${1}`
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

  connect() {
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