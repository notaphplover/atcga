import { isStringEnum } from '../../../../foundation/domain/calculations/isStringEnum';
import { TcgPokemonRegion } from '../models/TcgPokemonRegion';

export const isPokemonRegion: (value: unknown) => value is TcgPokemonRegion =
  isStringEnum(TcgPokemonRegion);
