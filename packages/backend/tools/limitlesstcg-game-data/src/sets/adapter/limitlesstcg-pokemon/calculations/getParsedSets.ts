import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getGeneratedRootDirectory } from '../../../../path/domain/calculations/getGeneratedRootDirectory.mjs';
import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';
import { TcgPokemonParsedSet } from '../models/TcgPokemonParsedSet';

export async function getParsedSets(
  region: TcgPokemonRegion,
): Promise<TcgPokemonParsedSet[]> {
  const regionGeneratedPokemonRootSetsFilePath: string = path.resolve(
    getGeneratedRootDirectory(),
    'pokemon',
    'parsed',
    region,
    'sets.json',
  );

  return JSON.parse(
    await readFile(regionGeneratedPokemonRootSetsFilePath, 'utf8'),
  ) as TcgPokemonParsedSet[];
}
