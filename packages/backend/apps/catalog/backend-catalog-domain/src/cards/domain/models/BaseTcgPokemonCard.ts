import { I18nString } from '../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../languages/domain/models/TcgPokemonLanguage';
import { TcgPokemonRegion } from '../../../regions/domain/models/TcgPokemonRegion';
import { TcgPokemonCardType } from './TcgPokemonCardType';
import { TcgPokemonRarity } from './TcgPokemonRarity';

export interface BaseTcgPokemonCard<TType extends TcgPokemonCardType> {
  cardType: TType;
  imageUrls: {
    xs: I18nString<TcgPokemonLanguage>;
    sm: I18nString<TcgPokemonLanguage>;
    lg: I18nString<TcgPokemonLanguage>;
  };
  languages: TcgPokemonLanguage[];
  name: I18nString<TcgPokemonLanguage>;
  number: string;
  rarity?: TcgPokemonRarity | undefined;
  region: TcgPokemonRegion;
  regulation?: string | undefined;
  set: string;
}
