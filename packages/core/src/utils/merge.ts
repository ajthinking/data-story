type Obj = {
  [key: string]: any
}

export const merge = (first: Obj, second: Obj) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(second)) {
    if (second[key] instanceof Object)
      Object.assign(second[key], merge(first[key], second[key]));
  }
  // Join `target` and modified `source`
  Object.assign(first || {}, second);
  return first;
}