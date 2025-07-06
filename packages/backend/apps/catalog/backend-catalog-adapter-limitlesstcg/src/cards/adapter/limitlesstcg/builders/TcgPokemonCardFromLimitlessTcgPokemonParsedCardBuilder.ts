import {
  TcgPokemonCard,
  TcgPokemonCardType,
  TcgPokemonEnergyCard,
  TcgPokemonRarity,
  TcgPokemonRegion,
  TcgPokemonTrainerCard,
} from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import {
  TcgPokemonCardType as LimitlessTcgPokemonCardType,
  TcgPokemonParsedCard as LimitlessTcgPokemonCard,
  TcgPokemonParsedEnergyCard as LimitlessTcgPokemonEnergyCard,
  TcgPokemonParsedSet as LimitlessTcgPokemonSet,
  TcgPokemonParsedTrainerCard as LimitlessTcgPokemonTrainerCard,
  TcgPokemonRarity as LimitlessTcgPokemonRarity,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';
import { inject } from 'inversify';

import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from '../../../../regions/adapter/limitlesstcg/builders/TcgPokemonRegionFromLimitlessPokemonRegionBuilder';
import { TcgPokemonRarityFromLimitlessPokemonRarityBuilder } from './TcgPokemonRarityFromLimitlessPokemonRarityBuilder';

export class TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder
  implements
    Builder<TcgPokemonCard, [LimitlessTcgPokemonCard, LimitlessTcgPokemonSet]>
{
  readonly #tcgPokemonRarityFromLimitlessPokemonRarityBuilder: Builder<
    TcgPokemonRarity,
    [LimitlessTcgPokemonRarity]
  >;
  readonly #tcgPokemonRegionFromLimitlessPokemonRegionBuilder: Builder<
    TcgPokemonRegion,
    [LimitlessTcgPokemonRegion]
  >;

  constructor(
    @inject(TcgPokemonRarityFromLimitlessPokemonRarityBuilder)
    tcgPokemonRarityFromLimitlessPokemonRarityBuilder: Builder<
      TcgPokemonRarity,
      [LimitlessTcgPokemonRarity]
    >,
    @inject(TcgPokemonRegionFromLimitlessPokemonRegionBuilder)
    tcgPokemonRegionFromLimitlessPokemonRegionBuilder: Builder<
      TcgPokemonRegion,
      [LimitlessTcgPokemonRegion]
    >,
  ) {
    this.#tcgPokemonRarityFromLimitlessPokemonRarityBuilder =
      tcgPokemonRarityFromLimitlessPokemonRarityBuilder;
    this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder =
      tcgPokemonRegionFromLimitlessPokemonRegionBuilder;
  }

  public build(
    limitlessTcgPokemonCard: LimitlessTcgPokemonCard,
    limitlessTcgPokemonSet: LimitlessTcgPokemonSet,
  ): TcgPokemonCard {
    switch (limitlessTcgPokemonCard.cardType) {
      case LimitlessTcgPokemonCardType.energy:
        return this.#buildEnergyCard(
          limitlessTcgPokemonCard,
          limitlessTcgPokemonSet,
        );
      case LimitlessTcgPokemonCardType.pokemon:
        throw new Error('Not implemented');
      case LimitlessTcgPokemonCardType.trainer:
        return this.#buildTrainerCard(
          limitlessTcgPokemonCard,
          limitlessTcgPokemonSet,
        );
    }
  }

  #buildEnergyCard(
    card: LimitlessTcgPokemonEnergyCard,
    set: LimitlessTcgPokemonSet,
  ): TcgPokemonEnergyCard {
    return {
      cardType: TcgPokemonCardType.energy,
      effect: card.effect,
      imageUrls: card.imageUrls,
      language: card.language,
      name: card.name,
      number: card.number,
      rarity:
        card.rarity === undefined
          ? undefined
          : this.#tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build(
              card.rarity,
            ),
      region: this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(
        set.region,
      ),
      regulation: card.regulation,
      set: card.set,
      type: card.type,
    };
  }

  #buildTrainerCard(
    card: LimitlessTcgPokemonTrainerCard,
    set: LimitlessTcgPokemonSet,
  ): TcgPokemonTrainerCard {
    return {
      cardType: TcgPokemonCardType.trainer,
      effect: card.effect,
      imageUrls: card.imageUrls,
      language: card.language,
      name: card.name,
      number: card.number,
      rarity:
        card.rarity === undefined
          ? undefined
          : this.#tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build(
              card.rarity,
            ),
      region: this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(
        set.region,
      ),
      set: card.set,
      type: card.type,
    };
  }
}
