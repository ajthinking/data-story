export function flattenObjectOneLevel(obj: Record<string, any>) {
  const flattened: Record<string, any> = {}
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      for (const subKey in obj[key]) {
        flattened[subKey] = obj[key][subKey]
      }
    } else {
      flattened[key] = obj[key]
    }
  }
  return flattened
}