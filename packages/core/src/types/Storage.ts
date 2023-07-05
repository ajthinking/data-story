import { ItemValue } from "./ItemValue"

export interface Storage {
  currentExecutionId: string | null

  init(): Promise<void>
  createExecution(): Promise<void>
  putExecutionItems(key: string, items: ItemValue): Promise<void>
}