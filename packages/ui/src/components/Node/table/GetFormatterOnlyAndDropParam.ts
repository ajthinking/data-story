import { ItemValue, ItemWithParams } from '@data-story/core';
import { DataStoryNodeData } from '../ReactFlowNode';

export function getFormatterOnlyAndDropParam(items: ItemValue[], data: DataStoryNodeData):
{ only: string[], drop: string[], destructObjects: boolean } {
  const paramEvaluator = new ItemWithParams(items, data.params, []);
  let only: string[] = [], drop: string[] = [];
  let destructObjects = true;
  try {
    only = paramEvaluator.params?.only as string[] ?? [];
    drop = paramEvaluator.params?.drop as string[] ?? [];
    destructObjects = paramEvaluator.params?.destructObjects === 'false' ? false : true;
  } catch(e) {
  }
  return { only, drop, destructObjects };
}