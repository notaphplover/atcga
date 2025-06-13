export function isArrayOf<T>(
  isItem: (item: unknown) => item is T,
): (array: unknown) => array is T[] {
  return (array: unknown): array is T[] =>
    Array.isArray(array) && array.every((item: unknown) => isItem(item));
}
