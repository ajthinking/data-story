export type GetItemsMessage = {
  type: 'getItems',
  atNodeId: string,
  id: string,
  offset?: number,
  limit?: number,
  total?: number,
}
