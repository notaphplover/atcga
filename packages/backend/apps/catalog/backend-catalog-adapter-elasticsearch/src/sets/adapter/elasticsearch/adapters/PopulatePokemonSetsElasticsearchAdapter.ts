import {
  PopulatePokemonSetsPort,
  ProvidePokemonSetsPort,
  providePokemonSetsPortSymbol,
} from '@atcga/backend-catalog-application';
import { TcgPokemonRegion, TcgPokemonSet } from '@atcga/backend-catalog-domain';
import { inject, injectable } from 'inversify';

import { ElasticsearchService } from '../../../../foundation/adapter/elasticsearch/services/ElasticsearchService';

@injectable()
export class PopulatePokemonSetsElasticsearchAdapter
  implements PopulatePokemonSetsPort
{
  readonly #elasticsearchService: ElasticsearchService;
  readonly #providePokemonSetsPort: ProvidePokemonSetsPort;

  constructor(
    @inject(ElasticsearchService)
    elasticsearchService: ElasticsearchService,
    @inject(providePokemonSetsPortSymbol)
    providePokemonSetsPort: ProvidePokemonSetsPort,
  ) {
    this.#elasticsearchService = elasticsearchService;
    this.#providePokemonSetsPort = providePokemonSetsPort;
  }

  public async populatePokemonSets(): Promise<TcgPokemonSet[]> {
    const sets: TcgPokemonSet[] = (
      await Promise.all(
        Object.values(TcgPokemonRegion).map(
          async (region: TcgPokemonRegion): Promise<TcgPokemonSet[]> =>
            this.#providePokemonSetsPort.providePokemonSets(region),
        ),
      )
    ).flat();

    await this.#elasticsearchService.client.bulk({
      operations: sets.flatMap((set: TcgPokemonSet) => [
        {
          index: {
            _index: this.#elasticsearchService.pokemonSetsIndexName,
          },
        },
        set,
      ]),
    });

    return sets;
  }
}
