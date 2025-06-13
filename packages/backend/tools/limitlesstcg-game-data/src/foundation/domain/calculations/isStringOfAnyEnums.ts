import { isStringEnum } from './isStringEnum';

export function isStringOfAnyEnums<T extends string>(
  ...enumObjects: Record<string, T>[]
): (value: unknown) => value is T {
  const enumChecks: ((value: unknown) => value is T)[] = enumObjects.map(
    (enumObject: Record<string, T>) => isStringEnum(enumObject),
  );

  return (value: unknown): value is T =>
    enumChecks.some((check: (value: unknown) => value is T) => check(value));
}
