import { Diagram } from "@data-story/core";
import { ServerConfig } from "./clients/ServerConfig";
export declare const DataStory: ({ server, diagram, callback }: {
    server?: ServerConfig | undefined;
    diagram?: Diagram | undefined;
    callback?: ((options: any) => void) | undefined;
}) => JSX.Element;
