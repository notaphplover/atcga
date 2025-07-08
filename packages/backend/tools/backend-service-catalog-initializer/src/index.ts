import {
  FoundationElasticsearchModule,
  SetsElasticsearchModule,
} from '@atcga/backend-catalog-adapter-elasticsearch';
import {
  FoundationLimitlessTcgModule,
  RegionsLimitlessTcgModule,
  SetsLimitlessTcgModule,
} from '@atcga/backend-catalog-adapter-limitlesstcg';
import {
  PopulateCatalogPort,
  SetsApplicationModule,
} from '@atcga/backend-catalog-application';
import { EnvModule } from '@atcga/backend-catalog-env';
import { Container } from 'inversify';

export async function initializeCatalogService(): Promise<void> {
  const container: Container = new Container();

  await container.load(
    new EnvModule(),
    new FoundationLimitlessTcgModule(),
    new FoundationElasticsearchModule(),
    new RegionsLimitlessTcgModule(),
    new SetsApplicationModule(),
    new SetsLimitlessTcgModule(),
    new SetsElasticsearchModule(),
  );

  const populateCatalogPort: PopulateCatalogPort =
    container.get(PopulateCatalogPort);

  await populateCatalogPort.populateCatalog();
}
