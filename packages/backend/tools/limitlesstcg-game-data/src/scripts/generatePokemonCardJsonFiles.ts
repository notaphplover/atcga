import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { buildParsedPokemonCard } from '../cards/adapter/limitlesstcg-pokemon/calculations/buildParsedPokemonCard';
import { getPokemonSetCards } from '../cards/adapter/limitlesstcg-pokemon/calculations/getPokemonSetCards';
import { TcgPokemonCard } from '../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonCard';
import { TcgPokemonParsedCard } from '../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonParsedCard';
import { TcgPokemonSearchCard } from '../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonSearchCard';
import { TcgPokemonLanguage } from '../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { TcgPokemonRegion } from '../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';
import { buildPokemonParsedSet } from '../sets/adapter/limitlesstcg-pokemon/calculations/buildPokemonParsedSet';
import { getPokemonSets } from '../sets/adapter/limitlesstcg-pokemon/calculations/getPokemonSets';
import { TcgPokemonParsedSet } from '../sets/adapter/limitlesstcg-pokemon/models/TcgPokemonParsedSet';
import { TcgPokemonSet } from '../sets/adapter/limitlesstcg-pokemon/models/TcgPokemonSet';

const JSON_INDENTATION: number = 2;

async function buildRegionToSetToLanguagesMapAndWriteSetFiles(): Promise<
  Map<TcgPokemonRegion, Map<string, TcgPokemonLanguage[]>>
> {
  const regionToSetCodeToLanguageToSetMap: Map<
    TcgPokemonRegion,
    Map<string, Map<TcgPokemonLanguage, TcgPokemonSet>>
  > = new Map();

  const regionToSetToLanguagesMap: Map<
    TcgPokemonRegion,
    Map<string, TcgPokemonLanguage[]>
  > = new Map();

  for (const language of Object.values(TcgPokemonLanguage)) {
    const sets: TcgPokemonSet[] = await getPokemonSets(language);

    const setsJson: string = JSON.stringify(sets, null, JSON_INDENTATION);
    const fileName: string = `sets-${language}.json`;
    const filePath: string = `./generated/pokemon/raw/${language}/${fileName}`;

    // Ensure the directory exists before writing the file
    await ensureDirectoryExists(dirname(filePath));
    await writeFile(filePath, setsJson, 'utf8');
    console.log(`Generated ${fileName} successfully.`);

    for (const set of sets) {
      const region: TcgPokemonRegion = set.region;
      const setCode: string = set.code;

      let regionToSetCodeToLanguageToSetMapEntries:
        | Map<string, Map<TcgPokemonLanguage, TcgPokemonSet>>
        | undefined = regionToSetCodeToLanguageToSetMap.get(region);

      if (regionToSetCodeToLanguageToSetMapEntries === undefined) {
        regionToSetCodeToLanguageToSetMapEntries = new Map();
        regionToSetCodeToLanguageToSetMap.set(
          region,
          regionToSetCodeToLanguageToSetMapEntries,
        );
      }

      let setCodeLanguageToSetMapEntries:
        | Map<TcgPokemonLanguage, TcgPokemonSet>
        | undefined = regionToSetCodeToLanguageToSetMapEntries.get(setCode);

      if (setCodeLanguageToSetMapEntries === undefined) {
        setCodeLanguageToSetMapEntries = new Map();
        regionToSetCodeToLanguageToSetMapEntries.set(
          setCode,
          setCodeLanguageToSetMapEntries,
        );
      }

      setCodeLanguageToSetMapEntries.set(language, set);

      let regionToSetToLanguagesMapEntry:
        | Map<string, TcgPokemonLanguage[]>
        | undefined = regionToSetToLanguagesMap.get(region);

      if (regionToSetToLanguagesMapEntry === undefined) {
        regionToSetToLanguagesMapEntry = new Map();
        regionToSetToLanguagesMap.set(region, regionToSetToLanguagesMapEntry);
      }

      let regionSetLanguages: TcgPokemonLanguage[] | undefined =
        regionToSetToLanguagesMapEntry.get(setCode);

      if (regionSetLanguages === undefined) {
        regionSetLanguages = [];
        regionToSetToLanguagesMapEntry.set(setCode, regionSetLanguages);
      }

      regionSetLanguages.push(language);
    }
  }

  for (const [
    region,
    setCodeToLanguageToSetMap,
  ] of regionToSetCodeToLanguageToSetMap) {
    const parsedSets: TcgPokemonParsedSet[] = [];

    for (const languageToSetMap of setCodeToLanguageToSetMap.values()) {
      const parsedSet: TcgPokemonParsedSet =
        buildPokemonParsedSet(languageToSetMap);

      parsedSets.push(parsedSet);
    }

    const setsJson: string = JSON.stringify(parsedSets, null, JSON_INDENTATION);
    const filePath: string = `./generated/pokemon/parsed/${region}/sets.json`;

    // Ensure the directory exists before writing the file
    await ensureDirectoryExists(dirname(filePath));
    await writeFile(filePath, setsJson, 'utf8');
    console.log(`Generated ${filePath} successfully.`);
  }

  return regionToSetToLanguagesMap;
}

/**
 * Ensures that a directory exists, creating it if necessary
 * @param directoryPath Path to directory to ensure exists
 */
async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  try {
    await mkdir(directoryPath, { recursive: true });
  } catch (error) {
    // Ignore error if directory already exists
    const nodeError: NodeJS.ErrnoException = error as NodeJS.ErrnoException;
    if (nodeError.code !== 'EEXIST') {
      throw error;
    }
  }
}

void (async function generatePokemonCardJsonFiles(): Promise<void> {
  // 1. Populate the regionToSetToLanguagesMap with sets and languages and create sets files
  const regionToSetToLanguagesMap: Map<
    TcgPokemonRegion,
    Map<string, TcgPokemonLanguage[]>
  > = await buildRegionToSetToLanguagesMapAndWriteSetFiles();

  for (const [region, setToLanguagesMap] of regionToSetToLanguagesMap) {
    for (const [setCode, languages] of setToLanguagesMap) {
      const printNumberToCardsMap: Map<string, TcgPokemonCard[]> = new Map();

      // 2. Create raw card files for each set and language and populate print number to cards map
      for (const language of languages) {
        const cards: (TcgPokemonCard & TcgPokemonSearchCard)[] =
          await getPokemonSetCards(setCode, language);

        for (const card of cards) {
          let printNumberCards: TcgPokemonCard[] | undefined =
            printNumberToCardsMap.get(card.number);

          if (printNumberCards === undefined) {
            printNumberCards = [];
            printNumberToCardsMap.set(card.number, printNumberCards);
          }

          printNumberCards.push(card);

          const cardJson: string = JSON.stringify(card, null, JSON_INDENTATION);
          const cardFileName: string = `${card.number}.json`;
          const cardFilePath: string = `./generated/pokemon/raw/${region}/${language}/${setCode}/${cardFileName}`;

          await ensureDirectoryExists(dirname(cardFilePath));
          await writeFile(cardFilePath, cardJson, 'utf8');
          console.log(`Generated ${cardFilePath} successfully.`);
        }
      }

      // 3. Create parsed card files for each print number
      for (const [printNumber, cards] of printNumberToCardsMap) {
        const parsedCard: TcgPokemonParsedCard = buildParsedPokemonCard(cards);
        const parsedPokemonCardJson: string = JSON.stringify(
          parsedCard,
          null,
          JSON_INDENTATION,
        );
        const parsedCardFileName: string = `${printNumber}.json`;
        const parsedCardFilePath: string = `./generated/pokemon/parsed/${region}/${setCode}/${parsedCardFileName}`;

        await ensureDirectoryExists(dirname(parsedCardFilePath));
        await writeFile(parsedCardFilePath, parsedPokemonCardJson, 'utf8');
        console.log(`Generated ${parsedCardFilePath} successfully.`);
      }
    }
  }
})();
