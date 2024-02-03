import { stringifyError } from './stringifyError'

export const serializeError = (error: any) => {
  return JSON.parse(stringifyError(error))
}