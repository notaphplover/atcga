import { TcgPokemonRegion } from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import { TcgPokemonRegion as LimitlessTcgPokemonRegion } from '@atcga/limitlesstcg-game-data';
import { injectable } from 'inversify';

@injectable()
export class LimitlessTcgPokemonRegionFromPokemonRegionBuilder
  implements Builder<LimitlessTcgPokemonRegion, [TcgPokemonRegion]>
{
  public build(region: TcgPokemonRegion): LimitlessTcgPokemonRegion {
    switch (region) {
      case TcgPokemonRegion.international:
        return LimitlessTcgPokemonRegion.int;
      case TcgPokemonRegion.japan:
        return LimitlessTcgPokemonRegion.tpc;
    }
  }
}
