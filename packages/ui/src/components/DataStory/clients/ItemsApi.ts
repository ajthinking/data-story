import { ItemValue } from '@data-story/core';

export interface ItemsOptions {
  atNodeId: string;
  limit?: number;
  offset?: number;
}

export interface ItemsResponse {
  items: ItemValue[];
  total: number;
}

export interface ItemsApi {
  getItems: (options: ItemsOptions) =>  Promise<ItemsResponse>;
}
