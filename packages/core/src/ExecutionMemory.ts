import { NodeStatus } from './Executor'
import { LinkId } from './types/Link'
import { NodeId } from './types/Node'
import { InputDeviceInterface } from './types/InputDeviceInterface'
import { OutputDeviceInterface } from './OutputDevice'
import { ItemValue } from './types/ItemValue'

type MemoryValues = {
  nodeStatuses?: Map<NodeId, NodeStatus>,
  nodeRunners?: Map<NodeId, AsyncGenerator<undefined, void, void>>,
  linkItems?: Map<LinkId, ItemValue[]>,
  linkCounts?: Map<LinkId, number>
  inputDevices?: Map<NodeId, InputDeviceInterface>,
  outputDevices?: Map<NodeId, OutputDeviceInterface>,
  hooks?: any[],
}

export class ExecutionMemory {
  nodeStatuses: Map<NodeId, NodeStatus>
  nodeRunners: Map<NodeId, AsyncGenerator<undefined, void, void>>
  linkItems: Map<LinkId, ItemValue[]>
  linkCounts: Map<LinkId, number>
  inputDevices: Map<NodeId, InputDeviceInterface>
  outputDevices: Map<NodeId, OutputDeviceInterface>
  hooks: any[]
  
  history: string[] = []

  constructor(values: MemoryValues = {}) {
    this.nodeStatuses = values.nodeStatuses || new Map()
    this.nodeRunners = values.nodeRunners || new Map()
    this.linkItems = values.linkItems || new Map()
    this.linkCounts = values.linkCounts || new Map()
    this.inputDevices = values.inputDevices || new Map()
    this.outputDevices = values.outputDevices || new Map()
    this.hooks = values.hooks || []
  }

  getNodeStatus(nodeId: NodeId): NodeStatus | undefined {
    return this.nodeStatuses.get(nodeId)
  }

  setNodeStatus(nodeId: NodeId, status: NodeStatus) {
    if(status === 'COMPLETE') console.log(`Setting node ${nodeId} to ${status}`);
    this.history.push(`Setting node ${nodeId} to ${status}`)

    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatuses(): Map<NodeId, NodeStatus> {
    return this.nodeStatuses
  }

  getNodeRunner(nodeId: NodeId): AsyncGenerator<undefined, void, void> | undefined {
    return this.nodeRunners.get(nodeId)
  }

  setNodeRunner(nodeId: NodeId, status: AsyncGenerator<undefined, void, void>) {
    this.history.push(`Setting node ${nodeId} runner`)

    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): ItemValue[] | undefined {
    return this.linkItems.get(linkId)
  }

  pullLinkItems(linkId: LinkId, count: number = Infinity): ItemValue[] {
    const linkItems = this.linkItems.get(linkId)!
    const pulled = linkItems.splice(0, count)

    this.history.push(`Pulled in ${pulled.length} items from link ${linkId}`)

    return pulled
  }

  pushLinkItems(linkId: LinkId, items: ItemValue[]): void {
    const linkItems = this.linkItems.get(linkId)!
    linkItems.push(...items)

    this.history.push(`Pushed ${items.length} items to link ${linkId}`)
  }

  setLinkItems(linkId: LinkId, items: ItemValue[]) {
    this.history.push(`Setting link ${linkId} items: ${JSON.stringify(items)}`)

    this.linkItems.set(linkId, items)
  }

  getLinkCount(linkId: LinkId): number | undefined {
    return this.linkCounts.get(linkId)
  }

  getLinkCounts(): Map<LinkId, number> {
    return this.linkCounts
  }

  setLinkCount(linkId: LinkId, count: number) {
    this.history.push(`Setting link ${linkId} count to ${count}`)

    this.linkCounts.set(linkId, count)
  }

  getInputDevice(nodeId: NodeId): InputDeviceInterface | undefined {
    return this.inputDevices.get(nodeId)
  }

  setInputDevice(nodeId: NodeId, device: InputDeviceInterface) {
    this.history.push(`Setting node ${nodeId} input device`)
    this.inputDevices.set(nodeId, device)
  }

  getHistory(): string[] {
    return this.history
  }

  pushHistoryMessage(message: string) {
    this.history.push(message)
  }

  pushHooks(hooks: any[]) {
    this.hooks.push(...hooks)
  }

  pullHooks() {
    const pulled = [...this.hooks]

    this.hooks = []

    return pulled
  }
}