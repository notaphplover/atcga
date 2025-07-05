import {
  PopulatePokemonSetsPort,
  ProvidePokemonSetsPort,
  providePokemonSetsPortSymbol,
} from '@atcga/backend-catalog-application';
import {
  TcgPokemonLanguage,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { estypes } from '@elastic/elasticsearch';
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
    await this.#createEmptyPokemonSetIndex();

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

  async #createEmptyPokemonSetIndex(): Promise<void> {
    const pokemonSetsExists: boolean =
      await this.#elasticsearchService.client.indices.exists({
        index: this.#elasticsearchService.pokemonSetsIndexName,
      });

    if (pokemonSetsExists) {
      await this.#elasticsearchService.client.indices.delete({
        index: this.#elasticsearchService.pokemonSetsIndexName,
      });
    }

    await this.#elasticsearchService.client.indices.create({
      index: this.#elasticsearchService.pokemonSetsIndexName,
      mappings: {
        properties: {
          code: { type: 'keyword' },
          name: {
            properties: Object.values(TcgPokemonLanguage).reduce(
              (
                properties: Record<
                  estypes.PropertyName,
                  estypes.MappingProperty
                >,
                language: TcgPokemonLanguage,
              ): Record<estypes.PropertyName, estypes.MappingProperty> => {
                properties[language] = {
                  type: 'text',
                };

                return properties;
              },
              {},
            ),
            type: 'object',
          },
          region: {
            type: 'keyword',
          },
        },
      },
    });
  }
}
