import { get } from '../../utils/get'

export const mapAdditive = (
  original: Record<string, any>,
  map: Record<string, any>
) => {
  const mapped = { ...original }
  
  Object.entries(map).forEach(([newKey, path]) => {
    if(path && typeof path === 'object') {
      mapped[newKey] = mapAdditive(original, path)
      return 
    }

    mapped[newKey] = get(original, path)

  })
  
  return mapped
}