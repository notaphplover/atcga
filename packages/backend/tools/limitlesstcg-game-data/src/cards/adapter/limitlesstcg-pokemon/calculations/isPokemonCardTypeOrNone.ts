import { isStringEnumOrNull } from '../../../../foundation/domain/calculations/isStringEnumOrNull';
import { TcgPokemonTypeOrNone } from '../models/TcgPokemonTypeOrNone';

export const isPokemonCardTypeOrNone: (
  value: unknown,
) => value is TcgPokemonTypeOrNone | null =
  isStringEnumOrNull(TcgPokemonTypeOrNone);
