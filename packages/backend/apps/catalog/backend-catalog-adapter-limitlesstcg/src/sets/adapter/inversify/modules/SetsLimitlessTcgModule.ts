import { providePokemonSetsPortSymbol } from '@atcga/backend-catalog-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { ProvidePokemonSetsLimitlessTcgAdapter } from '../../limitlesstcg/ProvidePokemonSetsLimitlessTcgAdapter';

export class SetsLimitlessTcgModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(providePokemonSetsPortSymbol)
        .to(ProvidePokemonSetsLimitlessTcgAdapter)
        .inSingletonScope();
    });
  }
}
