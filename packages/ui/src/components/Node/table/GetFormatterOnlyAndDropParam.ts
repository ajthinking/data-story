import { ItemValue, ItemWithParams, StringableParam } from '@data-story/core';
import { DataStoryNodeData } from '../ReactFlowNode';
import { parseStringList } from '../../../../../core/src/utils/parseStringList';

export function getFormatterOnlyAndDropParamOLD(items: ItemValue[], data: DataStoryNodeData):{ only: string[], drop: string[], destructObjects: boolean } {
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

export function getFormatterOnlyAndDropParam(items: ItemValue[], data: DataStoryNodeData): { only: string[], drop: string[], destructObjects: boolean } {
  const onlyParam = data.params.find(param => param.name === 'only') as StringableParam | undefined;
  const dropParam = data.params.find(param => param.name === 'drop') as StringableParam | undefined;
  const destructObjectsParam = data.params.find(param => param.name === 'destructObjects') as StringableParam | undefined;

  return {
    only: (() => {
      console.log({ onlyParam });
      if(onlyParam === undefined) return [];
      return parseStringList(onlyParam?.input?.rawValue);
    })(),
    drop: (() => {
      console.log({ dropParam });
      if(dropParam === undefined) return [];
      return parseStringList(dropParam?.input?.rawValue);
    })(),
    destructObjects: (() => {
      if (destructObjectsParam === undefined) return true;
      return destructObjectsParam.input?.rawValue !== 'false';
    })(),
  }
}