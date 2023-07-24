import { Diagram } from "../../Diagram"

export type SaveMessage = {
  type: "save"
  name: string
  diagram: Diagram
}