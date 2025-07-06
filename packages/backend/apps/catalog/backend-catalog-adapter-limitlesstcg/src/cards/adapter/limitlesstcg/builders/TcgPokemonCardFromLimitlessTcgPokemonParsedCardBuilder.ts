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
  TcgPokemonParsedTrainerCard as LimitlessTcgPokemonTrainerCard,
  TcgPokemonRarity as LimitlessTcgPokemonRarity,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';
import { inject } from 'inversify';

import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from '../../../../regions/adapter/limitlesstcg/builders/TcgPokemonRegionFromLimitlessPokemonRegionBuilder';
import { TcgPokemonRarityFromLimitlessPokemonRarityBuilder } from './TcgPokemonRarityFromLimitlessPokemonRarityBuilder';

export class TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder
  implements
    Builder<
      TcgPokemonCard,
      [LimitlessTcgPokemonCard, LimitlessTcgPokemonRegion]
    >
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
    limitlessTcgPokemonRegion: LimitlessTcgPokemonRegion,
  ): TcgPokemonCard {
    switch (limitlessTcgPokemonCard.cardType) {
      case LimitlessTcgPokemonCardType.energy:
        return this.#buildEnergyCard(
          limitlessTcgPokemonCard,
          limitlessTcgPokemonRegion,
        );
      case LimitlessTcgPokemonCardType.pokemon:
        throw new Error('Not implemented');
      case LimitlessTcgPokemonCardType.trainer:
        return this.#buildTrainerCard(
          limitlessTcgPokemonCard,
          limitlessTcgPokemonRegion,
        );
    }
  }

  #buildEnergyCard(
    card: LimitlessTcgPokemonEnergyCard,
    region: LimitlessTcgPokemonRegion,
  ): TcgPokemonEnergyCard {
    return {
      cardType: TcgPokemonCardType.energy,
      effect: card.effect,
      imageUrls: card.imageUrls,
      languages: card.languages,
      name: card.name,
      number: card.number,
      rarity:
        card.rarity === undefined
          ? undefined
          : this.#tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build(
              card.rarity,
            ),
      region:
        this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(region),
      regulation: card.regulation,
      set: card.set,
      type: card.type,
    };
  }

  #buildTrainerCard(
    card: LimitlessTcgPokemonTrainerCard,
    region: LimitlessTcgPokemonRegion,
  ): TcgPokemonTrainerCard {
    return {
      cardType: TcgPokemonCardType.trainer,
      effect: card.effect,
      imageUrls: card.imageUrls,
      languages: card.languages,
      name: card.name,
      number: card.number,
      rarity:
        card.rarity === undefined
          ? undefined
          : this.#tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build(
              card.rarity,
            ),
      region:
        this.#tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(region),
      set: card.set,
      type: card.type,
    };
  }
}
