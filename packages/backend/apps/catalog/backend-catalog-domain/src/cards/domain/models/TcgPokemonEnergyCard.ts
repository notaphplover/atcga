import { I18nString } from '../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../languages/domain/models/TcgPokemonLanguage';
import { BaseTcgPokemonCard } from './BaseTcgPokemonCard';
import { TcgPokemonCardSubtype } from './TcgPokemonCardSubtype';
import { TcgPokemonCardType } from './TcgPokemonCardType';

export interface TcgPokemonEnergyCard
  extends BaseTcgPokemonCard<TcgPokemonCardType.energy> {
  effect: I18nString<TcgPokemonLanguage>;
  type: TcgPokemonCardSubtype.basic | TcgPokemonCardSubtype.special;
}
