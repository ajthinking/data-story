export const parseStringList = (list: string | undefined): string[] => {
  if (!list) return [];

  return list
    .split('\n')
    .flatMap(line => line.split(','))
    .map(v => v.trim())
    .filter(v => v.length > 0)
};