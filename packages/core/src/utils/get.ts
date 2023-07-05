export function get(
  target: any,
  path?: string,
  delimiter = '.'
) {
  if (!path) {
    return target
  }
  const pathParts = path.split(delimiter)
  let result = target
  for (const pathPart of pathParts) {
    if (result === null || result === undefined) {
      return undefined
    }
    result = result[pathPart]
  }
  return result
}