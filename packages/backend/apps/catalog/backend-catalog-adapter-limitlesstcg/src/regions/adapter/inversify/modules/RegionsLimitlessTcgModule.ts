import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { LimitlessTcgPokemonRegionFromPokemonRegionBuilder } from '../../limitlesstcg/builders/LimitlessTcgPokemonRegionFromPokemonRegionBuilder';
import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from '../../limitlesstcg/builders/TcgPokemonRegionFromLimitlessPokemonRegionBuilder';

export class RegionsLimitlessTcgModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(LimitlessTcgPokemonRegionFromPokemonRegionBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(TcgPokemonRegionFromLimitlessPokemonRegionBuilder)
        .toSelf()
        .inSingletonScope();
    });
  }
}
