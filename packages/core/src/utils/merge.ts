type Obj = {
  [key: string]: any
}

export const merge = (first: Obj = {}, second: Obj = {}): Obj => {
  const result: Obj = { ...first };
  for (const key of Object.keys(second)) {
    if (
      second[key] &&
      typeof second[key] === 'object' &&
      !Array.isArray(second[key])
    ) {
      result[key] = merge(first[key] || {}, second[key]);
    } else {
      result[key] = second[key];
    }
  }
  return result;
};