import React, { memo } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import { NodeComponent } from '../../index';

const ConsoleNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData
  selected: boolean
}) => {
  console.log('ConsoleNodeComponent', id, data, selected)
  return <NodeComponent id={id} data={data} selected={selected}/>
}

export default memo(ConsoleNodeComponent);