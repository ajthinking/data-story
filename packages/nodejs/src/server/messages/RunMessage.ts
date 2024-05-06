import { Diagram, type InputObserver } from '@data-story/core'

export type RunMessage = {
  type: 'run'
  diagram: Diagram,
  InputObserver: InputObserver[],
}
