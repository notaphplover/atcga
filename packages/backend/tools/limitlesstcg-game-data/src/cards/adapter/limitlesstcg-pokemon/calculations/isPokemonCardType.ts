import { isStringEnum } from '../../../../foundation/domain/calculations/isStringEnum';
import { TcgPokemonCardType } from '../models/TcgPokemonCardType';

export const isPokemonCardType: (
  value: unknown,
) => value is TcgPokemonCardType = isStringEnum(TcgPokemonCardType);
