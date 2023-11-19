import { get } from "../../utils/get"

export const mapReplace = (
  original: Record<string, any>,
  map: Record<string, any>
) => {
  const mapped: Record<string, any> = {}
  
  Object.entries(map).forEach(([newKey, path]) => {
    if(path && typeof path === 'object') {
      mapped[newKey] = mapReplace(original, path)
      return 
    }

    mapped[newKey] = get(original, path)

  })
  
  return mapped
}