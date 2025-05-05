import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { BuilderAsync } from '@atcga/backend-common';
import { Client, estypes } from '@elastic/elasticsearch';

import { FindElasticSearchService } from './FindElasticSearchService';

describe(FindElasticSearchService, () => {
  let clientMock: Mocked<Client>;
  let modelFromDocumentBuilder: Mocked<BuilderAsync<unknown, [unknown]>>;
  let searchRequestFromCreateQueryBuilder: Mocked<
    BuilderAsync<estypes.SearchRequest, [unknown]>
  >;

  let findElasticSearchService: FindElasticSearchService<
    unknown,
    unknown,
    unknown
  >;

  beforeAll(() => {
    clientMock = {
      search: vitest.fn() as unknown,
    } as Partial<Mocked<Client>> as Mocked<Client>;
    modelFromDocumentBuilder = {
      build: vitest.fn(),
    };
    searchRequestFromCreateQueryBuilder = {
      build: vitest.fn(),
    };

    findElasticSearchService = new FindElasticSearchService(
      clientMock,
      modelFromDocumentBuilder,
      searchRequestFromCreateQueryBuilder,
    );
  });

  describe('.find', () => {
    describe('when called', () => {
      let modelFixture: unknown;
      let queryFixture: unknown;
      let searchRequestFixture: estypes.SearchRequest;
      let searchResponseFixture: estypes.SearchResponse;

      let result: unknown;

      beforeAll(async () => {
        modelFixture = Symbol();
        queryFixture = Symbol();
        searchRequestFixture = Symbol() as unknown as estypes.SearchRequest;
        searchResponseFixture = {
          hits: {
            hits: [
              {
                _source: Symbol() as unknown,
              },
            ],
          },
        } as unknown as estypes.SearchResponse;

        searchRequestFromCreateQueryBuilder.build.mockResolvedValueOnce(
          searchRequestFixture,
        );
        clientMock.search.mockResolvedValueOnce(searchResponseFixture);
        modelFromDocumentBuilder.build.mockResolvedValueOnce(modelFixture);

        result = await findElasticSearchService.find(queryFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call searchRequestFromCreateQueryBuilder.build()', () => {
        expect(searchRequestFromCreateQueryBuilder.build).toHaveBeenCalledTimes(
          1,
        );
        expect(searchRequestFromCreateQueryBuilder.build).toHaveBeenCalledWith(
          queryFixture,
        );
      });

      it('should call client.search()', () => {
        expect(clientMock.search).toHaveBeenCalledTimes(1);
        expect(clientMock.search).toHaveBeenCalledWith(searchRequestFixture);
      });

      it('should call modelFromDocumentBuilder.build()', () => {
        expect(modelFromDocumentBuilder.build).toHaveBeenCalledTimes(1);
        expect(modelFromDocumentBuilder.build).toHaveBeenCalledWith(
          searchResponseFixture.hits.hits[0]?._source,
        );
      });

      it('should return the model', () => {
        expect(result).toStrictEqual([modelFixture]);
      });
    });
  });
});
