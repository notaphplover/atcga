export function isStringEnum<T extends string>(
  enumObject: Record<string, T>,
): (value: unknown) => value is T {
  return (value: unknown): value is T =>
    typeof value === 'string' && Object.values(enumObject).includes(value as T);
}
