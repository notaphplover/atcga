import { Builder, BuilderAsync } from '@atcga/backend-common';
import { Client, estypes } from '@elastic/elasticsearch';

export class InsertElasticSearchService<TDocument, TQuery> {
  readonly #client: Client;
  readonly #bulkRequestFromCreateQueryBuilder:
    | Builder<estypes.BulkRequest<TDocument>, [TQuery]>
    | BuilderAsync<estypes.BulkRequest<TDocument>, [TQuery]>;

  constructor(
    client: Client,
    bulkRequestFromCreateQueryBuilder:
      | Builder<estypes.BulkRequest<TDocument>, [TQuery]>
      | BuilderAsync<estypes.BulkRequest<TDocument>, [TQuery]>,
  ) {
    this.#client = client;
    this.#bulkRequestFromCreateQueryBuilder = bulkRequestFromCreateQueryBuilder;
  }

  public async insert(query: TQuery): Promise<void> {
    const request: estypes.BulkRequest<TDocument> =
      await this.#bulkRequestFromCreateQueryBuilder.build(query);

    await this.#client.bulk<TDocument>(request);
  }
}
