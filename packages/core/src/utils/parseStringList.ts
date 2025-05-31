export const parseStringList = (list: string): string[] => list
  .split('\n')
  .flatMap(line => line.split(','))
  .map(v => v.trim())
  .filter(v => v.length > 0)