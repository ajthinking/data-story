import { SerializedReactFlow } from "../../types/SerializedReactFlow"

export type SaveMessage = {
  type: "save"
  name: string
  reactFlow: SerializedReactFlow
}