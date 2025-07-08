import { I18nString } from '../../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';

export interface TcgPokemonParsedSet {
  code: string;
  name: I18nString<TcgPokemonLanguage>;
  region: TcgPokemonRegion;
}
