import { I18nString } from '../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../languages/domain/models/TcgPokemonLanguage';
import { TcgPokemonCardType } from './TcgPokemonCardType';
import { TcgPokemonRarity } from './TcgPokemonRarity';

export interface BaseTcgPokemonCard<TType extends TcgPokemonCardType> {
  cardType: TType;
  imageUrls: {
    xs: I18nString<TcgPokemonLanguage>;
    sm: I18nString<TcgPokemonLanguage>;
    lg: I18nString<TcgPokemonLanguage>;
  };
  language: string;
  name: I18nString<TcgPokemonLanguage>;
  number: string;
  rarity?: TcgPokemonRarity | undefined;
  regulation?: string | undefined;
  set: string;
}
