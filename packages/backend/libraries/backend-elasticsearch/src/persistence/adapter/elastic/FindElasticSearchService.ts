import { Builder, BuilderAsync } from '@atcga/backend-common';
import { Client, estypes } from '@elastic/elasticsearch';

export class FindElasticSearchService<TModel, TDocument, TQuery> {
  readonly #client: Client;
  readonly #modelFromDocumentBuilder:
    | Builder<TModel, [TDocument]>
    | BuilderAsync<TModel, [TDocument]>;

  readonly #searchRequestFromCreateQueryBuilder:
    | Builder<estypes.SearchRequest, [TQuery]>
    | BuilderAsync<estypes.SearchRequest, [TQuery]>;

  constructor(
    client: Client,
    modelFromDocumentBuilder:
      | Builder<TModel, [TDocument]>
      | BuilderAsync<TModel, [TDocument]>,
    searchRequestFromCreateQueryBuilder:
      | Builder<estypes.SearchRequest, [TQuery]>
      | BuilderAsync<estypes.SearchRequest, [TQuery]>,
  ) {
    this.#client = client;
    this.#modelFromDocumentBuilder = modelFromDocumentBuilder;
    this.#searchRequestFromCreateQueryBuilder =
      searchRequestFromCreateQueryBuilder;
  }

  public async find(query: TQuery): Promise<TModel[]> {
    const searchRequest: estypes.SearchRequest =
      await this.#searchRequestFromCreateQueryBuilder.build(query);

    const searchResult: estypes.SearchResponse<TDocument> =
      await this.#client.search(searchRequest);

    return Promise.all(
      searchResult.hits.hits.map(async (hit: estypes.SearchHit<TDocument>) =>
        // Assuming _source is NOT disabled https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/mapping-source-field#disable-source-field
        this.#modelFromDocumentBuilder.build(hit._source as TDocument),
      ),
    );
  }
}
