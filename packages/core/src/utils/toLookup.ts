import { get } from './get';

export const toLookup = <T extends {}>(
  items: T[],
  keyPath: string,
  valuePath: string
) => {
  return items.reduce((result, item) => {
    const key = get(item, keyPath);
    const value = get(item, valuePath);
    result[key] = value;
    return result;
  }, {} as Record<string, any>);
}