import process from 'node:process';

import { EnvLoader } from '@atcga/backend-env';
import { bool, cleanEnv, port, url } from 'envalid';
import { injectable } from 'inversify';

import { Environment } from '../models/Environment';
import { EnvironmentRaw } from '../models/EnvironmentRaw';

const DEFAULT_DOT_ENV_PATH: string = '.env';
const DOT_ENV_PATH_ENV_VAR: string = 'ATCGA_CATALOG_DOT_ENV_PATH';
const DOT_ENV_ENABLED_ENV_VAR: string = 'ATCGA_CATALOG_DOT_ENV_ENABLED';

@injectable()
export class EnvironmentLoader extends EnvLoader<Environment> {
  public static build(): EnvironmentLoader {
    const dotEnvPath: string =
      process.env[DOT_ENV_PATH_ENV_VAR] ?? DEFAULT_DOT_ENV_PATH;

    const environmentLoader: EnvironmentLoader = new EnvironmentLoader(
      dotEnvPath,
    );

    return environmentLoader;
  }

  protected _parseEnv(env: Record<string, string>): Environment {
    const rawEnvironment: EnvironmentRaw = cleanEnv(env, {
      ATCGA_CATALOG_ELASTICSEARCH_CONNECTION_URL: url(),
      ATCGA_CATALOG_ELASTICSEARCH_TLS_REJECT_UNAUTHORIZED: bool(),
      ATCGA_CATALOG_PORT: port(),
    });

    return {
      elasticSearchConnectionUrl:
        rawEnvironment.ATCGA_CATALOG_ELASTICSEARCH_CONNECTION_URL,
      elasticSearchTlsRejectUnauthorized:
        rawEnvironment.ATCGA_CATALOG_ELASTICSEARCH_TLS_REJECT_UNAUTHORIZED,
      port: rawEnvironment.ATCGA_CATALOG_PORT,
    };
  }

  protected override _shouldParseEnvFile(): boolean {
    return process.env[DOT_ENV_ENABLED_ENV_VAR] !== 'false';
  }
}
