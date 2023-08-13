import { Diagram } from "@data-story/core";
import { Workbench } from "./Workbench";
import { ServerConfig } from "./clients/ServerConfig";

export const DataStory = ({
  server,
  diagram,
  callback
}: {
  server?: ServerConfig
  diagram?: Diagram
  callback?: (options: any) => void
}) => {
  return <Workbench
    server={server}
    diagram={diagram}
    callback={callback}
  />
};