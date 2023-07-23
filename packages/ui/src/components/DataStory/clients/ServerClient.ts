import { Diagram, SerializedReactFlow } from "@data-story/core";

export interface ServerClient {
  init: () => void;
  describe: () => void;
  run: (diagram: Diagram) => void;
  open: (name: string) => void;
  save: (name: string, reactFlow: SerializedReactFlow) => {}
}