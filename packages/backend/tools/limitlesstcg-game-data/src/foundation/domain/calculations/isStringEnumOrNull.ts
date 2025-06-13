import { isStringEnum } from './isStringEnum';

export function isStringEnumOrNull<T extends string>(
  enumObject: Record<string, T>,
): (value: unknown) => value is T | null {
  const isStringEnumCheck: (value: unknown) => value is T =
    isStringEnum(enumObject);

  return (value: unknown): value is T | null =>
    value === null || isStringEnumCheck(value);
}
