import { I18nString } from '../../../../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonParsedCard';
import { TcgPokemonLanguage } from '../../../../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { TcgPokemonParsedSet } from '../models/TcgPokemonParsedSet';
import { TcgPokemonSet } from '../models/TcgPokemonSet';

export function buildPokemonParsedSet(
  languageToSetMap: Map<TcgPokemonLanguage, TcgPokemonSet>,
): TcgPokemonParsedSet {
  const [firstEntry]: [TcgPokemonLanguage, TcgPokemonSet][] = [
    ...languageToSetMap,
  ];

  if (firstEntry === undefined) {
    throw new Error('No sets provided to buildPokemonParsedSet');
  }

  const [, firstSet]: [TcgPokemonLanguage, TcgPokemonSet] = firstEntry;

  return {
    code: firstSet.code,
    name: [...languageToSetMap].reduce(
      (
        i18nString: I18nString,
        [language, set]: [TcgPokemonLanguage, TcgPokemonSet],
      ): I18nString => {
        i18nString[language] = set.name;

        return i18nString;
      },
      {},
    ),
    region: firstSet.region,
  };
}
