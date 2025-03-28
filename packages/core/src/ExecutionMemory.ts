import { NodeStatus } from './Executor'
import { LinkId } from './types/Link'
import { NodeId } from './types/Node'
import { ItemValue } from './types/ItemValue'
import { Hook } from './types/Hook'
import { InputDevice } from './InputDevice'
import { OutputDevice } from './OutputDevice'
import { InputObserverController } from './InputObserverController'
import { RequestObserverType } from './types/InputObserveConfig';
import { NodeRunnerContext } from './NodeRunnerContext'

type MemoryValues = {
  nodeStatuses?: Map<NodeId, NodeStatus>,
  nodeRunners?: Map<NodeId, AsyncGenerator<undefined, void, void>>,
  nodeContexts?: Map<NodeId, NodeRunnerContext>,
  linkItems?: Map<LinkId, ItemValue[]>,
  linkCounts?: Map<LinkId, number>
  inputDevices?: Map<NodeId, InputDevice>,
  outputDevices?: Map<NodeId, OutputDevice>,
  hooks?: any[],
  inputObserverController?: InputObserverController,
}

export class ExecutionMemory {
  nodeStatuses: Map<NodeId, NodeStatus>
  nodeRunners: Map<NodeId, AsyncGenerator<undefined, void, void>>
  nodeContexts: Map<NodeId, NodeRunnerContext>
  linkItems: Map<LinkId, ItemValue[]>
  linkCounts: Map<LinkId, number>
  inputDevices: Map<NodeId, InputDevice>
  outputDevices: Map<NodeId, OutputDevice>
  hooks: Hook[]
  inputObserverController?: InputObserverController

  constructor(values: MemoryValues = {}) {
    this.nodeStatuses = values.nodeStatuses || new Map()
    this.nodeRunners = values.nodeRunners || new Map()
    this.nodeContexts = values.nodeContexts || new Map()
    this.linkItems = values.linkItems || new Map()
    this.linkCounts = values.linkCounts || new Map()
    this.inputDevices = values.inputDevices || new Map()
    this.outputDevices = values.outputDevices || new Map()
    this.hooks = values.hooks || [];
    this.inputObserverController = values.inputObserverController;
  }

  getNodeStatus(nodeId: NodeId): NodeStatus | undefined {
    return this.nodeStatuses.get(nodeId)
  }

  setNodeStatus(nodeId: NodeId, status: NodeStatus) {
    this.inputObserverController?.reportNodeStatus(nodeId, status);
    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatuses(): Map<NodeId, NodeStatus> {
    return this.nodeStatuses
  }

  getNodeContext(nodeId: NodeId): NodeRunnerContext | undefined {
    return this.nodeContexts.get(nodeId)
  }

  setNodeContext(nodeId: NodeId, context: NodeRunnerContext) {
    this.nodeContexts.set(nodeId, context)
  }

  getNodeRunner(nodeId: NodeId): AsyncGenerator<undefined, void, void> | undefined {
    return this.nodeRunners.get(nodeId)
  }

  setNodeRunner(nodeId: NodeId, status: AsyncGenerator<undefined, void, void>) {
    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): ItemValue[] | undefined {
    return this.linkItems.get(linkId)
  }

  pullLinkItems(linkId: LinkId, count: number = Infinity): ItemValue[] {
    const linkItems = this.linkItems.get(linkId)!
    const pulled = linkItems.splice(0, count)

    return pulled
  }

  pushLinkItems(linkId: LinkId, items: ItemValue[]): void {
    const linkItems = this.linkItems.get(linkId)!
    this.linkItems.set(linkId, linkItems.concat(items))

    this.inputObserverController?.reportItems({
      linkId,
      type: RequestObserverType.observeLinkItems,
      items,
    })
  }

  setLinkItems(linkId: LinkId, items: ItemValue[]) {
    this.inputObserverController?.setItems(linkId, items);

    this.linkItems.set(linkId, items)
  }

  getLinkCount(linkId: LinkId): number | undefined {
    return this.linkCounts.get(linkId)
  }

  getLinkCounts(): Map<LinkId, number> {
    return this.linkCounts
  }

  setLinkCount(linkId: LinkId, count: number) {
    this.inputObserverController?.reportLinksCount({
      linkId,
      type: RequestObserverType.observeLinkCounts,
      count,
    })

    this.linkCounts.set(linkId, count)
  }

  getInputDevice(nodeId: NodeId): InputDevice | undefined {
    return this.inputDevices.get(nodeId)
  }

  setInputDevice(nodeId: NodeId, device: InputDevice) {
    this.inputDevices.set(nodeId, device)
  }

  pushHooks(hooks: Hook[]) {
    this.hooks.push(...hooks)
  }

  pullHooks() {
    const pulled = [...this.hooks]

    this.hooks = []

    return pulled
  }
}