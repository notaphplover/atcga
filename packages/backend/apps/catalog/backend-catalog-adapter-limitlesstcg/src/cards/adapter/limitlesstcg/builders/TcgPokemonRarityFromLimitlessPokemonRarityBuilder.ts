import { TcgPokemonRarity } from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import { TcgPokemonRarity as LimitlessTcgPokemonRarity } from '@atcga/limitlesstcg-game-data';
import { injectable } from 'inversify';

@injectable()
export class TcgPokemonRarityFromLimitlessPokemonRarityBuilder
  implements Builder<TcgPokemonRarity, [LimitlessTcgPokemonRarity]>
{
  public build(rarity: LimitlessTcgPokemonRarity): TcgPokemonRarity {
    switch (rarity) {
      case LimitlessTcgPokemonRarity.amazingRare:
        return TcgPokemonRarity.amazingRare;
      case LimitlessTcgPokemonRarity.artRare:
        return TcgPokemonRarity.artRare;
      case LimitlessTcgPokemonRarity.common:
        return TcgPokemonRarity.common;
      case LimitlessTcgPokemonRarity.characterHoloRare:
        return TcgPokemonRarity.characterHoloRare;
      case LimitlessTcgPokemonRarity.characterSuperRare:
        return TcgPokemonRarity.characterSuperRare;
      case LimitlessTcgPokemonRarity.doubleRare:
        return TcgPokemonRarity.doubleRare;
      case LimitlessTcgPokemonRarity.holoRare:
        return TcgPokemonRarity.holoRare;
      case LimitlessTcgPokemonRarity.radiantRare:
        return TcgPokemonRarity.radiantRare;
      case LimitlessTcgPokemonRarity.rare:
        return TcgPokemonRarity.rare;
      case LimitlessTcgPokemonRarity.rainbowRare:
        return TcgPokemonRarity.rainbowRare;
      case LimitlessTcgPokemonRarity.secretRare:
        return TcgPokemonRarity.secretRare;
      case LimitlessTcgPokemonRarity.shinyRare:
        return TcgPokemonRarity.shinyRare;
      case LimitlessTcgPokemonRarity.shinyUltraRare:
        return TcgPokemonRarity.shinyUltraRare;
      case LimitlessTcgPokemonRarity.specialArtRare:
        return TcgPokemonRarity.specialArtRare;
      case LimitlessTcgPokemonRarity.tripleRare:
        return TcgPokemonRarity.tripleRare;
      case LimitlessTcgPokemonRarity.ultraRare:
        return TcgPokemonRarity.ultraRare;
      case LimitlessTcgPokemonRarity.uncommon:
        return TcgPokemonRarity.uncommon;
    }
  }
}
