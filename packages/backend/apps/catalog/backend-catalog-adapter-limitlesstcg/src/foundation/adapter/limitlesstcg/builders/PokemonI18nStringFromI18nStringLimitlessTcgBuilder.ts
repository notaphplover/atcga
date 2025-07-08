import { TcgPokemonLanguage } from '@atcga/backend-catalog-domain';
import { TcgPokemonLanguage as LimitlessTcgPokemonLanguage } from '@atcga/limitlesstcg-game-data';
import { injectable } from 'inversify';

import { I18nStringFromI18nStringLimitlessTcgBuilder } from './I18nStringFromI18nStringLimitlessTcgBuilder';

@injectable()
export class PokemonI18nStringFromI18nStringLimitlessTcgBuilder extends I18nStringFromI18nStringLimitlessTcgBuilder<
  TcgPokemonLanguage,
  LimitlessTcgPokemonLanguage
> {
  constructor() {
    super({
      [LimitlessTcgPokemonLanguage.english]: TcgPokemonLanguage.english,
      [LimitlessTcgPokemonLanguage.french]: TcgPokemonLanguage.french,
      [LimitlessTcgPokemonLanguage.german]: TcgPokemonLanguage.german,
      [LimitlessTcgPokemonLanguage.italian]: TcgPokemonLanguage.italian,
      [LimitlessTcgPokemonLanguage.japanese]: TcgPokemonLanguage.japanese,
      [LimitlessTcgPokemonLanguage.portuguese]: TcgPokemonLanguage.portuguese,
      [LimitlessTcgPokemonLanguage.spanish]: TcgPokemonLanguage.spanish,
    });
  }
}
