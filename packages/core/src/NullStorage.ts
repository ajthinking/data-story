import { ItemValue } from './types/ItemValue';
import { Storage } from './types/Storage';

export class NullStorage implements Storage {
  currentExecutionId = '1'
  
  async init() {}
  async createExecution() {}
  async putExecutionItems(key: string, items: ItemValue) {}
}