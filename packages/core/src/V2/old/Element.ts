import { Param } from '../../Param'
import { ItemValue } from '../../types/ItemValue'
import { AbstractPort, PortName } from '../../types/Port'
import { Observable, Subject } from 'rxjs'
import { ApplicationV2 } from './ApplicationV2'

export type OperatorBootArgs = {
  inputs: {
    [key: string]: Observable<ItemValue[]>
  },
  outputs: {
    [key: string]: Subject<ItemValue[]>
  },
  params: Record<string, Param>,
  app: ApplicationV2
}

// Todo, if needed separate into Source, Operator and Watcher nodes
export interface Element {
  name: string
  label?: string
  docs?: string
  category?: string
  inputs: (PortName  | AbstractPort)[]
  outputs: (PortName | AbstractPort)[]
  params: Param[]
  tags?: string[]

  boot: (args: OperatorBootArgs) => void
}