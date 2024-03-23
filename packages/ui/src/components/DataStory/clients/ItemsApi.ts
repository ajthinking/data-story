export interface ItemsApi {
  getItems: (options: {
    atNodeId: string,
    limit?: number,
    offset?: number,
  }) => Promise<any[]>;
}