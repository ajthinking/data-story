import { SerializedReactFlow } from "../../types/SerializedReactFlow"

export type RunMessage = {
  type: "run"
  reactFlow: SerializedReactFlow
}