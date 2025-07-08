import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { PokemonI18nStringFromI18nStringLimitlessTcgBuilder } from '../../limitlesstcg/builders/PokemonI18nStringFromI18nStringLimitlessTcgBuilder';

export class FoundationLimitlessTcgModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(PokemonI18nStringFromI18nStringLimitlessTcgBuilder)
        .toSelf()
        .inSingletonScope();
    });
  }
}
