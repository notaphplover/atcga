import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { PopulateCatalogPort } from '../../../application/ports/input/PopulateCatalogPort';

export class SetsApplicationModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(PopulateCatalogPort).toSelf().inSingletonScope();
    });
  }
}
