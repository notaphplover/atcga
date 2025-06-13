import { isPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/calculations/isPokemonRegion';
import { TcgPokemonSet } from '../models/TcgPokemonSet';

export function isSet(set: unknown): set is TcgPokemonSet {
  return (
    typeof set === 'object' &&
    set !== null &&
    typeof (set as Partial<TcgPokemonSet>).code === 'string' &&
    typeof (set as Partial<TcgPokemonSet>).name === 'string' &&
    isPokemonRegion((set as Partial<TcgPokemonSet>).region)
  );
}
