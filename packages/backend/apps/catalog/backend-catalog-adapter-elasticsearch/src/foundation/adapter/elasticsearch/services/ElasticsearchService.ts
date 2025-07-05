import { Environment, EnvironmentService } from '@atcga/backend-catalog-env';
import { Client } from '@elastic/elasticsearch';
import { inject, injectable } from 'inversify';

@injectable()
export class ElasticsearchService {
  readonly #client: Client;
  readonly #pokemonCardsIndexName: string;
  readonly #pokemonSetsIndexName: string;

  constructor(
    @inject(EnvironmentService)
    environmentService: EnvironmentService,
  ) {
    const environment: Environment = environmentService.getEnvironment();

    this.#pokemonCardsIndexName = 'pokemon-cards';
    this.#client = new Client({
      node: environment.elasticSearchConnectionUrl,
      tls: {
        rejectUnauthorized: environment.elasticSearchTlsRejectUnauthorized,
      },
    });
    this.#pokemonSetsIndexName = 'pokemon-sets';
  }

  public get pokemonCardsIndexName(): string {
    return this.#pokemonCardsIndexName;
  }

  public get client(): Client {
    return this.#client;
  }

  public get pokemonSetsIndexName(): string {
    return this.#pokemonSetsIndexName;
  }
}
