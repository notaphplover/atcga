import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { EnvironmentLoader } from '../../../application/services/EnvironmentLoader';

export class EnvModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(EnvironmentLoader).toSelf().inSingletonScope();
    });
  }
}
