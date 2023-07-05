import { ItemValue } from './ItemValue';
import { ItemWithParams } from '../ItemWithParams';
import { LinkId } from '../types/Link';

export interface InputDeviceInterface {
  pull: (count?: number) => ItemWithParams[]
  pullFrom: (name: string, count?: number) => ItemWithParams[]
  haveItemsAtInput(name: string): boolean;
  haveAllItemsAtInput(name: string): boolean;
  haveAllItemsAtAllInputs(): boolean;
  haveItemsAtAnyInput(): boolean;

  /**
   * @visibleForTesting
   */
  setItemsAt(linkId: LinkId, items: ItemValue) : void;
}