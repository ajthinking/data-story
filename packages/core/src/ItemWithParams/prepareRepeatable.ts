import { Param, Repeatable, Stringable } from '../Param';
import { ItemValue } from '../types/ItemValue';
import { evalMath } from '../utils/evalMath';
import { get } from '../utils/get';
import Hjson from '@data-story/hjson';
import { prepareStringable } from './prepareStringable';

export const prepareRepeatable = (itemValue: ItemValue, param: Param) => {
  // const inputMode = param.inputMode as Repeatable<Param[]>;

  // console.log({ inputMode })

  // let transformedValue = inputMode.value.map(row => {
  //   return row.map(rowParam => {
  //     console.log({ rowParam })
  //     if(rowParam.inputMode.type === 'Stringable') return prepareStringable(itemValue, rowParam);

  //     // Default to the raw value
  //     return rowParam.inputMode.value;
  //   })
  // })

  // return transformedValue;
}
