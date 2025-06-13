import { I18nString } from '../../../../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonParsedCard';
import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';

export interface TcgPokemonParsedSet {
  code: string;
  name: I18nString;
  region: TcgPokemonRegion;
}
