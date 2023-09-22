import { Diagram } from "@data-story/core";
import { SerializedReactFlow } from "../../../SerializedReactFlow";
export interface ServerClient {
    init: () => void;
    describe: () => void;
    run: (diagram: Diagram) => void;
    open: (name: string) => void;
    save: (name: string, reactFlow: SerializedReactFlow) => {};
}
