import { ItemValue } from './types/ItemValue';
import { ParamValue } from './Param';
export declare const isItemWithParams: (item: ItemWithParams | unknown) => item is ItemWithParams;
export declare class ItemWithParams {
    type: "ItemWithParams";
    value: ItemValue;
    params: Record<string, ParamValue>;
    constructor(value: ItemValue, params: Record<string, ParamValue>);
}
