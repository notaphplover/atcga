export function isStringOrNull(value: unknown): value is string | null {
  return typeof value === 'string' || value == null;
}
