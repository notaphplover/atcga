import { isPokemonCardTypeOrNone } from './isPokemonCardTypeOrNone';

export const isTcgPokemonCardTypeOrNoneArray: (
  value: unknown,
) => value is string | null = (value: unknown): value is string | null =>
  value === null ||
  (typeof value === 'string' &&
    value.split('/').every(isPokemonCardTypeOrNone));
