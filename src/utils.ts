export function toArray<T>(array: T) {
  if (Array.isArray(array))
    return array
  return [array]
}

export const sugarReg = /({{([\w\s\+\-_'"\*\/\$\.]+)}})/g
