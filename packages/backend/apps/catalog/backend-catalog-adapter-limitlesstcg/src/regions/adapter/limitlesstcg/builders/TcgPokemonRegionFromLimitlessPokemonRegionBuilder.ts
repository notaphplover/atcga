import { TcgPokemonRegion } from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import { TcgPokemonRegion as LimitlessTcgPokemonRegion } from '@atcga/limitlesstcg-game-data';
import { injectable } from 'inversify';

@injectable()
export class TcgPokemonRegionFromLimitlessPokemonRegionBuilder
  implements Builder<TcgPokemonRegion, [LimitlessTcgPokemonRegion]>
{
  public build(region: LimitlessTcgPokemonRegion): TcgPokemonRegion {
    switch (region) {
      case LimitlessTcgPokemonRegion.int:
        return TcgPokemonRegion.international;
      case LimitlessTcgPokemonRegion.tpc:
        return TcgPokemonRegion.japan;
    }
  }
}
