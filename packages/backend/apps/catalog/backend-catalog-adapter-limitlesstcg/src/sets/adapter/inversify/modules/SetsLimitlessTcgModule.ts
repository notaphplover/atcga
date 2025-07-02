import { provideSetsPortSymbol } from '@atcga/backend-catalog-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { ProvideSetsLimitlessTcgAdapter } from '../../limitlesstcg/ProvideSetsLimitlessTcgAdapter';

export class SetsLimitlessTcgModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(provideSetsPortSymbol)
        .to(ProvideSetsLimitlessTcgAdapter)
        .inSingletonScope();
    });
  }
}
