type Obj = {
  [key: string]: any
}

/**
 * @deprecated Use merge instead
 * @param first
 * @param second
 * @returns
 */
export const mergeLegacy = (first: Obj, second: Obj) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(second)) {
    if (second[key] instanceof Object)
      Object.assign(second[key], mergeLegacy(first[key], second[key]));
  }
  // Join `target` and modified `source`
  Object.assign(first || {}, second);
  return first;
}