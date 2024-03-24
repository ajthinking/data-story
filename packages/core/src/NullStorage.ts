import { ItemValue } from './types/ItemValue';
import { LinkId } from './types/Link';
import { NodeId } from './types/Node';
import { Storage } from './types/Storage';

export class NullStorage implements Storage {
  items = new Map<NodeId | LinkId, ItemValue[]>();
}