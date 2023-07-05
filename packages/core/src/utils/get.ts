export function get(target: any, path?: string) {
  if (!path) {
    return target
  }
  const pathParts = path.split('.')
  let result = target
  for (const pathPart of pathParts) {
    if (result === null || result === undefined) {
      return undefined
    }
    result = result[pathPart]
  }
  return result
}