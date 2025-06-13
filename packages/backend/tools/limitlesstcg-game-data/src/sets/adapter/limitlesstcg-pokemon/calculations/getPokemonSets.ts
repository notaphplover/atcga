import { TcgPokemonSet } from '../models/TcgPokemonSet';
import { isSetArray } from './isPokemonSetArray';

export async function getPokemonSets(lang?: string): Promise<TcgPokemonSet[]> {
  const query: string = lang === undefined ? '' : `?lang=${lang}`;

  const result: Response = await fetch(
    `https://limitlesstcg.com/api/cards/sets${query}`,
  );

  const sets: unknown = await result.json();

  if (!isSetArray(sets)) {
    throw new Error(
      'Error fetching Pokemon sets from Limitless TCG: Invalid response format',
    );
  }

  return sets;
}
