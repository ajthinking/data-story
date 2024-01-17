export type EntityPage = {
  results: {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    archived?: boolean,
    properties: {
      [key: string]: string | null,
    },
  }[],
  paging?: {
    next?: {
      after?: string,link?: string }
  }
}