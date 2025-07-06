import { ProvidePokemonCardsPort } from '@atcga/backend-catalog-application';
import {
  TcgPokemonCard,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import {
  getParsedSetCards,
  TcgPokemonParsedCard as LimitlessTcgPokemonCard,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';
import { inject, injectable } from 'inversify';

import { LimitlessTcgPokemonRegionFromPokemonRegionBuilder } from '../../../../regions/adapter/limitlesstcg/builders/LimitlessTcgPokemonRegionFromPokemonRegionBuilder';
import { TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder } from '../builders/TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder';

@injectable()
export class ProvidePokemonCardsLimitlessTcgAdapter
  implements ProvidePokemonCardsPort
{
  readonly #limitlessTcgPokemonRegionFromPokemonRegionBuilder: Builder<
    LimitlessTcgPokemonRegion,
    [TcgPokemonRegion]
  >;
  readonly #tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder: Builder<
    TcgPokemonCard,
    [LimitlessTcgPokemonCard, LimitlessTcgPokemonRegion]
  >;

  constructor(
    @inject(LimitlessTcgPokemonRegionFromPokemonRegionBuilder)
    limitlessTcgPokemonRegionFromPokemonRegionBuilder: Builder<
      LimitlessTcgPokemonRegion,
      [TcgPokemonRegion]
    >,
    @inject(TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder)
    tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder: Builder<
      TcgPokemonCard,
      [LimitlessTcgPokemonCard, LimitlessTcgPokemonRegion]
    >,
  ) {
    this.#limitlessTcgPokemonRegionFromPokemonRegionBuilder =
      limitlessTcgPokemonRegionFromPokemonRegionBuilder;
    this.#tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder =
      tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder;
  }

  public async providePokemonCards(
    set: TcgPokemonSet,
  ): Promise<TcgPokemonCard[]> {
    const limitlessRegion: LimitlessTcgPokemonRegion =
      this.#limitlessTcgPokemonRegionFromPokemonRegionBuilder.build(set.region);

    const limitlessRegionCards: LimitlessTcgPokemonCard[] =
      await getParsedSetCards(limitlessRegion, set.code);

    return limitlessRegionCards.map(
      (limitlessTcgPokemonCard: LimitlessTcgPokemonCard) =>
        this.#tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build(
          limitlessTcgPokemonCard,
          limitlessRegion,
        ),
    );
  }
}
