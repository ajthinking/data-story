import { ItemValue } from './ItemValue'
import { LinkId } from './Link';
import { NodeId } from './Node';

export interface Storage {
  itemsMap: Map<NodeId | LinkId, ItemValue>;
}
