export interface EnvironmentRaw extends Record<string, unknown> {
  ATCGA_CATALOG_ELASTICSEARCH_CONNECTION_URL: string;
  ATCGA_CATALOG_ELASTICSEARCH_TLS_REJECT_UNAUTHORIZED: boolean;
  ATCGA_CATALOG_PORT: number;
}
