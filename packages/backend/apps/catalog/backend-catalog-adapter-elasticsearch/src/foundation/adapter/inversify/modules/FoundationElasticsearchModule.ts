import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { ElasticsearchService } from '../../elasticsearch/services/ElasticsearchService';

export class FoundationElasticsearchModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options.bind(ElasticsearchService).toSelf().inSingletonScope();
    });
  }
}
