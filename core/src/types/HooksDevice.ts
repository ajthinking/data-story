import { Hook } from './Hook'

export type HooksDevice = {
  register: (hook: Hook) => void
}