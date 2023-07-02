export type ExecutionUpdate = {
  type: "ExecutionUpdate"
  counts: Record<string, number>
  hooks: any[];
}