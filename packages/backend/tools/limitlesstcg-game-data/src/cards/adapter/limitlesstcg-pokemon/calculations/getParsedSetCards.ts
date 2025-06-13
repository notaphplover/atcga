import { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

import { getGeneratedRootDirectory } from '../../../../path/domain/calculations/getGeneratedRootDirectory.mjs';
import { TcgPokemonParsedCard } from '../models/TcgPokemonParsedCard';

export async function getParsedSetCards(
  region: string,
  setCode: string,
): Promise<TcgPokemonParsedCard[]> {
  const regionGeneratedPokemonRootSetsFilePath: string = path.resolve(
    getGeneratedRootDirectory(),
    'pokemon',
    'parsed',
    region,
    setCode,
  );

  const cardFilePaths: string[] = (
    await fs.readdir(regionGeneratedPokemonRootSetsFilePath, {
      recursive: false,
      withFileTypes: true,
    })
  )
    .filter((directoryEntry: Dirent) => directoryEntry.isFile())
    .map((directoryEntry: Dirent) =>
      path.join(regionGeneratedPokemonRootSetsFilePath, directoryEntry.name),
    );

  return Promise.all(
    cardFilePaths.map(
      async (filePath: string): Promise<TcgPokemonParsedCard> =>
        JSON.parse(await fs.readFile(filePath, 'utf8')) as TcgPokemonParsedCard,
    ),
  );
}
