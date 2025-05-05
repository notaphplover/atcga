import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { Builder } from '@atcga/backend-common';
import { Client, estypes } from '@elastic/elasticsearch';

import { InsertElasticSearchService } from './InsertElasticSearchService';

describe(InsertElasticSearchService, () => {
  let clientMock: Mocked<Client>;
  let bulkRequestFromCreateQueryBuilderMock: Mocked<
    Builder<estypes.BulkRequest<unknown>, [unknown]>
  >;
  let insertElasticSearchService: InsertElasticSearchService<unknown, unknown>;

  beforeAll(() => {
    clientMock = {
      bulk: vitest.fn() as unknown,
    } as Partial<Mocked<Client>> as Mocked<Client>;

    bulkRequestFromCreateQueryBuilderMock = {
      build: vitest.fn(),
    };

    insertElasticSearchService = new InsertElasticSearchService(
      clientMock,
      bulkRequestFromCreateQueryBuilderMock,
    );
  });

  describe('.insert', () => {
    describe('when called', () => {
      let bulkRequestFixture: estypes.BulkRequest<unknown>;
      let queryFixture: unknown;

      let result: unknown;

      beforeAll(async () => {
        bulkRequestFixture =
          Symbol() as unknown as estypes.BulkRequest<unknown>;
        queryFixture = Symbol();

        bulkRequestFromCreateQueryBuilderMock.build.mockResolvedValue(
          bulkRequestFixture,
        );

        result = await insertElasticSearchService.insert(queryFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call bulkRequestFromCreateQueryBuilder.build()', () => {
        expect(
          bulkRequestFromCreateQueryBuilderMock.build,
        ).toHaveBeenCalledTimes(1);
        expect(
          bulkRequestFromCreateQueryBuilderMock.build,
        ).toHaveBeenCalledWith(queryFixture);
      });

      it('should call client.bulk()', () => {
        expect(clientMock.bulk).toHaveBeenCalledTimes(1);
        expect(clientMock.bulk).toHaveBeenCalledWith(bulkRequestFixture);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
