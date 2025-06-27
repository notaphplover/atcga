import { I18nString } from '../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../languages/domain/models/TcgPokemonLanguage';
import { TcgPokemonRegion } from '../../../regions/domain/models/TcgPokemonRegion';

export interface TcgPokemonSet {
  code: string;
  name: I18nString<TcgPokemonLanguage>;
  region: TcgPokemonRegion;
}
