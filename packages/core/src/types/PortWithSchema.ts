export type PortWithSchema = {
  id?: string,
  name: string,
  schema: {
    [key: string]: any,
  },
}