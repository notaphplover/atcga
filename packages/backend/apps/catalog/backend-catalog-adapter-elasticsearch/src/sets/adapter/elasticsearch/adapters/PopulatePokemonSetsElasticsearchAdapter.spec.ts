import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { ProvidePokemonSetsPort } from '@atcga/backend-catalog-application';
import {
  TcgPokemonLanguage,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { Client, estypes } from '@elastic/elasticsearch';

import { ElasticsearchService } from '../../../../foundation/adapter/elasticsearch/services/ElasticsearchService';
import { PopulatePokemonSetsElasticsearchAdapter } from './PopulatePokemonSetsElasticsearchAdapter';

describe(PopulatePokemonSetsElasticsearchAdapter, () => {
  let clientMock: Mocked<Client>;
  let elasticsearchServiceMock: Mocked<ElasticsearchService>;
  let providePokemonSetsPortMock: Mocked<ProvidePokemonSetsPort>;

  let populatePokemonSetsElasticsearchAdapter: PopulatePokemonSetsElasticsearchAdapter;

  beforeAll(() => {
    clientMock = {
      bulk: vitest.fn() as unknown,
      indices: {
        create: vitest.fn(),
        delete: vitest.fn(),
        exists: vitest.fn(),
      } as unknown,
    } as Partial<Mocked<Client>> as Mocked<Client>;

    elasticsearchServiceMock = {
      get client(): Client {
        return clientMock;
      },
      pokemonSetsIndexName: 'pokemonSets',
    } as Partial<Mocked<ElasticsearchService>> as Mocked<ElasticsearchService>;

    providePokemonSetsPortMock = {
      providePokemonSets: vitest.fn(),
    };

    populatePokemonSetsElasticsearchAdapter =
      new PopulatePokemonSetsElasticsearchAdapter(
        elasticsearchServiceMock,
        providePokemonSetsPortMock,
      );
  });

  describe('.populatePokemonSets', () => {
    let setFixture: TcgPokemonSet;

    beforeAll(() => {
      setFixture = {
        code: 'SET123',
        name: {
          [TcgPokemonLanguage.english]: 'Test Set',
        },
        region: TcgPokemonRegion.international,
      };
    });

    describe('when called, and elasticsearchService.indices.exists() returns false', () => {
      let result: unknown;

      beforeAll(async () => {
        vitest
          .mocked(elasticsearchServiceMock.client.indices.exists)
          .mockResolvedValueOnce(false);

        providePokemonSetsPortMock.providePokemonSets
          .mockResolvedValueOnce([setFixture])
          .mockResolvedValueOnce([setFixture]);

        result =
          await populatePokemonSetsElasticsearchAdapter.populatePokemonSets();
      });

      afterAll((): void => {
        vitest.clearAllMocks();
      });

      it('should call elasticsearchService.client.indices.exists()', () => {
        expect(
          elasticsearchServiceMock.client.indices.exists,
        ).toHaveBeenCalledTimes(1);
        expect(
          elasticsearchServiceMock.client.indices.exists,
        ).toHaveBeenCalledWith({
          index: elasticsearchServiceMock.pokemonSetsIndexName,
        });
      });

      it('should call elasticsearchService.client.indices.create()', () => {
        expect(
          elasticsearchServiceMock.client.indices.create,
        ).toHaveBeenCalledTimes(1);
        expect(
          elasticsearchServiceMock.client.indices.create,
        ).toHaveBeenCalledWith({
          index: elasticsearchServiceMock.pokemonSetsIndexName,
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
                  ) => {
                    properties[language] = { type: 'text' };
                    return properties;
                  },
                  {},
                ),
                type: 'object',
              },
              region: { type: 'keyword' },
            },
          },
        });
      });

      it('should call providePokemonSetsPort.providePokemonSets()', () => {
        expect(
          providePokemonSetsPortMock.providePokemonSets,
        ).toHaveBeenCalledTimes(Object.values(TcgPokemonRegion).length);

        Object.values(TcgPokemonRegion).forEach(
          (region: TcgPokemonRegion): void => {
            expect(
              providePokemonSetsPortMock.providePokemonSets,
            ).toHaveBeenCalledWith(region);
          },
        );
      });

      it('should call elasticsearchService.client.bulk()', () => {
        expect(clientMock.bulk).toHaveBeenCalledTimes(1);
        expect(clientMock.bulk).toHaveBeenCalledWith({
          operations: [
            {
              index: {
                _index: elasticsearchServiceMock.pokemonSetsIndexName,
              },
            },
            setFixture,
            {
              index: {
                _index: elasticsearchServiceMock.pokemonSetsIndexName,
              },
            },
            setFixture,
          ],
        });
      });

      it('should return the provided sets', () => {
        expect(result).toStrictEqual([setFixture, setFixture]);
      });
    });

    describe('when called, and elasticsearchService.indices.exists() returns true', () => {
      let result: unknown;

      beforeAll(async () => {
        vitest
          .mocked(elasticsearchServiceMock.client.indices.exists)
          .mockResolvedValueOnce(true);

        providePokemonSetsPortMock.providePokemonSets
          .mockResolvedValueOnce([setFixture])
          .mockResolvedValueOnce([setFixture]);

        result =
          await populatePokemonSetsElasticsearchAdapter.populatePokemonSets();
      });

      afterAll((): void => {
        vitest.clearAllMocks();
      });

      it('should call elasticsearchService.client.indices.exists()', () => {
        expect(
          elasticsearchServiceMock.client.indices.exists,
        ).toHaveBeenCalledTimes(1);
        expect(
          elasticsearchServiceMock.client.indices.exists,
        ).toHaveBeenCalledWith({
          index: elasticsearchServiceMock.pokemonSetsIndexName,
        });
      });

      it('should call elasticsearchService.client.indices.delete()', () => {
        expect(
          elasticsearchServiceMock.client.indices.delete,
        ).toHaveBeenCalledTimes(1);
        expect(
          elasticsearchServiceMock.client.indices.delete,
        ).toHaveBeenCalledWith({
          index: elasticsearchServiceMock.pokemonSetsIndexName,
        });
      });

      it('should call providePokemonSetsPort.providePokemonSets()', () => {
        expect(
          providePokemonSetsPortMock.providePokemonSets,
        ).toHaveBeenCalledTimes(Object.values(TcgPokemonRegion).length);

        Object.values(TcgPokemonRegion).forEach(
          (region: TcgPokemonRegion): void => {
            expect(
              providePokemonSetsPortMock.providePokemonSets,
            ).toHaveBeenCalledWith(region);
          },
        );
      });

      it('should call elasticsearchService.client.bulk()', () => {
        expect(clientMock.bulk).toHaveBeenCalledTimes(1);
        expect(clientMock.bulk).toHaveBeenCalledWith({
          operations: [
            {
              index: {
                _index: elasticsearchServiceMock.pokemonSetsIndexName,
              },
            },
            setFixture,
            {
              index: {
                _index: elasticsearchServiceMock.pokemonSetsIndexName,
              },
            },
            setFixture,
          ],
        });
      });

      it('should return the provided sets', () => {
        expect(result).toStrictEqual([setFixture, setFixture]);
      });
    });
  });
});
