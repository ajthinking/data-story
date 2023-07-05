import React, { memo } from "react";
import { StoreSchema, useStore } from "../DataStory/store";
import { shallow } from "zustand/shallow";
import CustomHandle from "./CustomHandle";
import { DataStoryNodeData } from "./DataStoryNode";
import { Handle, Position } from "reactflow";
import { PortIcon } from "../DataStory/icons/portIcon";

const DataStoryInputNodeComponent = ({ id, data, selected }: { id: string; data: DataStoryNodeData; selected: boolean }) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { setOpenNodeModalId } = useStore(selector, shallow);

  return (
    <div
      className={"text-xs" + (selected ? " shadow-xl" : "")}
      onDoubleClick={() => {
        setOpenNodeModalId(id);
      }}
    >
      <div className="flex w-full items-right justify-end -mx-4">
        <div className={"rounded-l rounded-full py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-amber-400 text-gray-100 px-2" + (selected ? ' bg-blue-700 shadow-xl' : '') }>
          <div className="w-24" />
          Demo Input
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="absolute my-0.5 -ml-2"><PortIcon /></div>
          <Handle
            className="relative"
            type="source"
            position={Position.Right}
            style={{ opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 6, right: 6}}
            id={id}
            isConnectable={true}
          />
        </div>                    
      </div>  
    </div>
  );
};

export default memo(DataStoryInputNodeComponent);
