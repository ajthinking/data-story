import { ItemValue } from '@data-story/core';

export interface TableItems {
  atNodeId: string;
  limit?: number;
  offset?: number;
}

export interface ItemsApi {
  getItems: (options: TableItems) => Promise<{
    items: ItemValue[],
    total: number,
  }>;
}
