function deepClone<T>(obj: T): T {
  return obj === undefined || obj === null ? obj : JSON.parse(JSON.stringify(obj));
}

export const buildNestedObject = (path: string, data: any): Record<string, any> => {
  if (!path) return deepClone(data);

  // Defensive: prevent circular reference by ensuring data is not included in the result chain
  // (Not strictly necessary with deepClone, but extra safe)
  const clone = deepClone(data);
  const keys = path.split('.').reverse();
  let result: any = clone;

  for (const key of keys) {
    // If result is already an object containing key that refers to clone, break to prevent cycle
    if (typeof result === 'object' && result !== null && result[key] === clone) {
      throw new Error('Circular reference detected in buildNestedObject');
    }
    result = { [key]: result };
  }
  return result;
}