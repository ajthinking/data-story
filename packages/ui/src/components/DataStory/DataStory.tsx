import { Diagram } from "@data-story/core";
import { Workbench } from "./Workbench";
import { ServerConfig } from "./clients/ServerConfig";
import { DataStoryProvider } from "./store/store";

export const DataStory = ({
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
  return <DataStoryProvider>
    <Workbench
      server={ server }
      diagram={ diagram }
      callback={ callback }
      hideToolbar={ hideToolbar }
    />
  </DataStoryProvider>
};
