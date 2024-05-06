import { Diagram } from '@data-story/core'

export type RunMessage = {
  type: 'run'
  diagram: Diagram,
  observeInputPort: {nodeId: string, portId?: string}[],
}
