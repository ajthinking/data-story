import { Diagram } from "@data-story/core";
import { Workbench } from "./Workbench";
import { ServerConfig } from "./clients/ServerConfig";

export const DataStory2 = ({
  server,
  diagram,
  callback,
  hideToolbar = false,
}: {
  server?: ServerConfig
  diagram?: Diagram
  hideToolbar?: boolean
  callback?: (options: any) => void
}) => {
  return <Workbench
    server={server}
    diagram={diagram}
    callback={callback}
    hideToolbar={hideToolbar}
  />
};