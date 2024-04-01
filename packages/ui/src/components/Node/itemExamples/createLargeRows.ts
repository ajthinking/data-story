export const createLargeRows = (count: number) => Array.from({ length: count }, (_, index) => ({
  'foo1': 'bar1',
  'foo2': 'bar2',
  'foo3': 'bar3'
}));
