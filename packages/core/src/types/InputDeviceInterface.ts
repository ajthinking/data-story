import { ItemValue } from './ItemValue';
import { ItemWithParams } from '../ItemWithParams';
import { LinkId } from '../types/Link';

export interface InputDeviceInterface {
  pull: (count?: number) => ItemWithParams[]
  pullFrom: (name: string, count?: number) => ItemWithParams[]
  pullNew: (template?: ItemValue) => ItemWithParams[]
  havePort(name: string): boolean;
  haveItemsAtInput(name: string, minimum?: number): boolean;
  haveAllItemsAtInput(name: string): boolean;
  haveAllItemsAtAllInputs(): boolean;
  haveItemsAtAnyInput(): boolean;

  /**
   * @visibleForTesting
   */
  setItemsAt(linkId: LinkId, items: ItemValue) : void;
}