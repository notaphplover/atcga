import { ProvidePokemonSetsPort } from '@atcga/backend-catalog-application';
import {
  I18nString,
  TcgPokemonLanguage,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import {
  I18nString as LimitlessTcgI18nString,
  TcgPokemonLanguage as LimitlessTcgPokemonLanguage,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';
import {
  getParsedSets,
  TcgPokemonParsedSet,
} from '@atcga/limitlesstcg-game-data';
import { inject, injectable } from 'inversify';

import { PokemonI18nStringFromI18nStringLimitlessTcgBuilder } from '../../../../foundation/adapter/limitlesstcg/builders/PokemonI18nStringFromI18nStringLimitlessTcgBuilder';
import { LimitlessTcgPokemonRegionFromPokemonRegionBuilder } from '../../../../regions/adapter/limitlesstcg/builders/LimitlessTcgPokemonRegionFromPokemonRegionBuilder';
import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from '../../../../regions/adapter/limitlesstcg/builders/TcgPokemonRegionFromLimitlessPokemonRegionBuilder';

@injectable()
export class ProvidePokemonSetsLimitlessTcgAdapter
  implements ProvidePokemonSetsPort
{
  readonly #limitlessTcgPokemonRegionFromPokemonRegionBuilder: Builder<
    LimitlessTcgPokemonRegion,
    [TcgPokemonRegion]
  >;

  readonly #pokemonI18nStringFromI18nStringLimitlessTcgBuilder: Builder<
    I18nString<TcgPokemonLanguage>,
    [LimitlessTcgI18nString<LimitlessTcgPokemonLanguage>]
  >;

  readonly #tcgPokemonRegionFromLimitlessPokemonRegionBuilder: Builder<
    TcgPokemonRegion,
    [LimitlessTcgPokemonRegion]
  >;

  constructor(
    @inject(LimitlessTcgPokemonRegionFromPokemonRegionBuilder)
    limitlessTcgPokemonRegionFromPokemonRegionBuilder: Builder<
      LimitlessTcgPokemonRegion,
      [TcgPokemonRegion]
    >,
    @inject(PokemonI18nStringFromI18nStringLimitlessTcgBuilder)
    pokemonI18nStringFromI18nStringLimitlessTcgBuilder: Builder<
      I18nString<TcgPokemonLanguage>,
      [LimitlessTcgI18nString<LimitlessTcgPokemonLanguage>]
    >,
    @inject(TcgPokemonRegionFromLimitlessPokemonRegionBuilder)
    tcgPokemonRegionFromLimitlessPokemonRegionBuilder: Builder<
      TcgPokemonRegion,
      [LimitlessTcgPokemonRegion]
    >,
  ) {
    this.#limitlessTcgPokemonRegionFromPokemonRegionBuilder =
      limitlessTcgPokemonRegionFromPokemonRegionBuilder;
    this.#pokemonI18nStringFromI18nStringLimitlessTcgBuilder =
      pokemonI18nStringFromI18nStringLimitlessTcgBuilder;
    this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder =
      tcgPokemonRegionFromLimitlessPokemonRegionBuilder;
  }

  public async providePokemonSets(
    region: TcgPokemonRegion,
  ): Promise<TcgPokemonSet[]> {
    const limitlessRegion: LimitlessTcgPokemonRegion =
      this.#limitlessTcgPokemonRegionFromPokemonRegionBuilder.build(region);

    const sets: TcgPokemonParsedSet[] = await getParsedSets(limitlessRegion);

    return sets.map(
      (set: TcgPokemonParsedSet): TcgPokemonSet => ({
        code: set.code,
        name: this.#pokemonI18nStringFromI18nStringLimitlessTcgBuilder.build(
          set.name,
        ),
        region: this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(
          set.region,
        ),
      }),
    );
  }
}
