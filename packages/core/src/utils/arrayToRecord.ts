export const arrayToRecord = <T extends Record<K, any>, K extends keyof any>(array: T[], key: K): Record<K, T> => {
  const record: Record<K, T> = {} as Record<K, T>;
  array.forEach((element: T) => {
    record[element[key]] = element;
  });
  return record;
};