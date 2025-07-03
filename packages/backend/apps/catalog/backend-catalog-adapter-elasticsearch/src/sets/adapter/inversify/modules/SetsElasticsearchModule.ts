import { populatePokemonSetsPortSymbol } from '@atcga/backend-catalog-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { PopulatePokemonSetsElasticsearchAdapter } from '../../elasticsearch/adapters/PopulatePokemonSetsElasticsearchAdapter';

export class SetsElasticsearchModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(populatePokemonSetsPortSymbol)
        .to(PopulatePokemonSetsElasticsearchAdapter)
        .inSingletonScope();
    });
  }
}
