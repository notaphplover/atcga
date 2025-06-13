import { isStringEnum } from '../../../../foundation/domain/calculations/isStringEnum';
import { TcgPokemonType } from '../models/TcgPokemonType';

const isTcgPokemonType: (value: unknown) => value is TcgPokemonType =
  isStringEnum<TcgPokemonType>(TcgPokemonType);

export const isTcgPokemonTypeArray: (value: unknown) => value is string = (
  value: unknown,
): value is string =>
  typeof value === 'string' && value.split('/').every(isTcgPokemonType);
