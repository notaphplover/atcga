import { ProvidePokemonSetsPort } from '@atcga/backend-catalog-application';
import { TcgPokemonRegion, TcgPokemonSet } from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import { TcgPokemonRegion as LimitlessTcgPokemonRegion } from '@atcga/limitlesstcg-game-data';
import {
  getParsedSets,
  TcgPokemonParsedSet,
} from '@atcga/limitlesstcg-game-data';
import { inject, injectable } from 'inversify';

import { LimitlessTcgPokemonRegionFromPokemonRegionBuilder } from '../../../regions/adapter/limitlesstcg/builders/LimitlessTcgPokemonRegionFromPokemonRegionBuilder';
import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from '../../../regions/adapter/limitlesstcg/builders/TcgPokemonRegionFromLimitlessPokemonRegionBuilder';

@injectable()
export class ProvidePokemonSetsLimitlessTcgAdapter
  implements ProvidePokemonSetsPort
{
  readonly #limitlessTcgPokemonRegionFromPokemonRegionBuilder: Builder<
    LimitlessTcgPokemonRegion,
    [TcgPokemonRegion]
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
    @inject(TcgPokemonRegionFromLimitlessPokemonRegionBuilder)
    tcgPokemonRegionFromLimitlessPokemonRegionBuilder: Builder<
      TcgPokemonRegion,
      [LimitlessTcgPokemonRegion]
    >,
  ) {
    this.#limitlessTcgPokemonRegionFromPokemonRegionBuilder =
      limitlessTcgPokemonRegionFromPokemonRegionBuilder;
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
        name: set.name,
        region: this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(
          set.region,
        ),
      }),
    );
  }
}
