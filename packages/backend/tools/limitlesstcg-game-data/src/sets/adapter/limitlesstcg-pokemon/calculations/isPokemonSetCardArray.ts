import { TcgPokemonSearchCard } from '../../../../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonSearchCard';
import { isArrayOf } from '../../../../foundation/domain/calculations/isArrayOf';
import { isTcgPokemonSearchCard } from './isTcgPokemonSearchCard';

export const isPokemonSetCardArray: (
  array: unknown,
) => array is TcgPokemonSearchCard[] = isArrayOf(isTcgPokemonSearchCard);
