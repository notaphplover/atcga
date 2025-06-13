export function isNumberOrNull(value: unknown): value is number | null {
  return typeof value === 'number' || value == null;
}
