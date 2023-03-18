export function toArray<T>(array: T) {
  if (Array.isArray(array))
    return array
  return [array]
}
