import { beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import { ProvidePokemonSetsPort } from '@atcga/backend-catalog-application';
import {
  TcgPokemonLanguage,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { Client } from '@elastic/elasticsearch';

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

      providePokemonSetsPortMock.providePokemonSets
        .mockResolvedValueOnce([setFixture])
        .mockResolvedValueOnce([setFixture]);
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await populatePokemonSetsElasticsearchAdapter.populatePokemonSets();
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
