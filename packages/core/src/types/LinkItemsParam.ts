import { RequestObserverType } from './InputObserveConfig';
import { ItemValue } from './ItemValue';
import { LinkId } from './Link';

export type LinkItemsParam = {
  type: RequestObserverType.observeLinkItems;
  linkId: LinkId;
  items: ItemValue[];
}