import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { EnvironmentLoader } from '../../../application/services/EnvironmentLoader';
import { EnvironmentService } from '../../../application/services/EnvironmentService';

export class EnvModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(EnvironmentLoader).toSelf().inSingletonScope();
      options.bind(EnvironmentService).toSelf().inSingletonScope();
    });
  }
}
