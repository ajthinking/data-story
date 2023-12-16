export function get(target: any, path?: string, delimiter = '.') {
  if (!path) {
    return target;
  }
  const pathParts = path.split(delimiter);
  let result = target;

  for (const pathPart of pathParts) {
    if (result === null || result === undefined) {
      return undefined;
    }
    // Check if pathPart is an integer
    const index = parseInt(pathPart, 10);
    if (!isNaN(index) && Array.isArray(result)) {
      // If it's an integer and the current result is an array, use it as an index
      result = result[index];
    } else {
      // Otherwise, use it as a key
      result = result[pathPart];
    }
  }
  return result;
}