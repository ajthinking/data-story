import { RequestObserverType } from './InputObserveConfig';
import { ItemValue } from './ItemValue';

export type LinkItemsParam = {
  type: RequestObserverType.observeLinkItems;
  linkId: string;
  items: ItemValue[];
}