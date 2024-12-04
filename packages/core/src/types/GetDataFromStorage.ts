export type GetDataFromStorage = {
  type: 'getDataFromStorage',
  linkIds: string[],
  msgId?: string,
  offset?: number,
  limit?: number,
}