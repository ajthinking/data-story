import { Diagram } from '@data-story/core'

export type SaveMessage = {
  type: 'save'
  name: string
  diagram: Diagram
}