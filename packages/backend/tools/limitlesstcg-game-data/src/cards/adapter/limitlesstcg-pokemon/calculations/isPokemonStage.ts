import { isStringEnumOrNull } from '../../../../foundation/domain/calculations/isStringEnumOrNull';
import { TcgPokemonStage } from '../models/TcgPokemonStage';

export const isPokemonStage: (
  value: unknown,
) => value is TcgPokemonStage | null = isStringEnumOrNull(TcgPokemonStage);
