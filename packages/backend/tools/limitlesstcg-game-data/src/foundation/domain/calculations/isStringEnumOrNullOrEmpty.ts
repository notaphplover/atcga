import { isStringEnumOrNull } from './isStringEnumOrNull';

export function isStringEnumOrNullOrEmpty<T extends string>(
  enumObject: Record<string, T>,
): (value: unknown) => value is T | null | '' {
  const isStringEnumOrNullCheck: (value: unknown) => value is T | null =
    isStringEnumOrNull(enumObject);

  return (value: unknown): value is T | null | '' =>
    value === '' || isStringEnumOrNullCheck(value);
}
