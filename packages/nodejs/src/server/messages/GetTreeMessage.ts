export type GetTreeMessage = {
  id: string,
  awaited: boolean,
  type: 'getTree',
  path: string,
}