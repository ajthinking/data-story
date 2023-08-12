import { useEffect } from "react";
import { Header } from "./Header";
import { DataStory } from "./DataStory";
import { StoreSchema, useStore } from "./DataStory/store/store";
import { shallow } from "zustand/shallow";
export function DataStoryApp({ defaultFlowName, flow }: { defaultFlowName?: string; flow?: any }) {
  const selector = (state: StoreSchema) => ({
    flowName: state.flowName,
    setFlowName: state.setFlowName,
    open: state.open,
  });

  const { flowName, setFlowName, open } = useStore(selector, shallow);

  useEffect(() => {
    if (flow) open(flow.nodes, flow.edges);
    if (defaultFlowName !== undefined) setFlowName(defaultFlowName);
  }, [flow, defaultFlowName, open, setFlowName]);

  return (
    <>
      <div className="w-full h-screen bg-vsCodeWarmGray-900">
        <Header flowName={flowName} />
        <div className="w-full h-5/6">{<DataStory />}</div>
      </div>
    </>
  );
}
