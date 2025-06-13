import { isStringEnumOrNullOrEmpty } from '../../../../foundation/domain/calculations/isStringEnumOrNullOrEmpty';
import { TcgPokemonRarity } from '../models/TcgPokemonRarity';

export const isPokemonRarity: (
  value: unknown,
) => value is TcgPokemonRarity | null | '' =
  isStringEnumOrNullOrEmpty(TcgPokemonRarity);
