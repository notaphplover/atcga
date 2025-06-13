import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';

export interface TcgPokemonSet {
  code: string;
  name: string;
  region: TcgPokemonRegion;
}
