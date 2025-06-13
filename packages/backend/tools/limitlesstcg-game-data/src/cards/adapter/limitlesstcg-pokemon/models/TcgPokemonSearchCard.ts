import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';
import { TcgPokemonCardType } from './TcgPokemonCardType';

export interface TcgPokemonSearchCard {
  card_type: TcgPokemonCardType;
  id: number;
  name: string;
  number: string;
  region: TcgPokemonRegion;
  set: string;
  special: string | null;
  translation: number;
}
