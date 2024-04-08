export interface TableItems {
  atNodeId: string;
  limit?: number;
  offset?: number;
}

export interface ItemsApi {
  getItems: (options: TableItems) => Promise<any[]>;
}
