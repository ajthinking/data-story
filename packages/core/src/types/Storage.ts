import { ItemValue } from './ItemValue'
import { LinkId } from './Link';
import { NodeId } from './Node';

export interface Storage {
  items: Map<NodeId | LinkId, ItemValue>;
  [key: string]: any;
}