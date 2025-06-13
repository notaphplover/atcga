import { isTcgPokemonSearchCardArray } from '../../../../sets/adapter/limitlesstcg-pokemon/calculations/isTcgPokemonSearchCardArray';
import { TcgPokemonCard } from '../models/TcgPokemonCard';
import { TcgPokemonSearchCard } from '../models/TcgPokemonSearchCard';
import { isPokemonCard } from './isPokemonCard';

export async function getPokemonSetCards(
  setCode: string,
  language: string,
): Promise<(TcgPokemonCard & TcgPokemonSearchCard)[]> {
  const searchCardsResponse: Response = await fetch(
    `https://limitlesstcg.com/api/dm/search?q=!set%3A${encodeURIComponent(setCode)}&lang=${language}`,
  );

  const searchCards: unknown = await searchCardsResponse.json();

  if (!isTcgPokemonSearchCardArray(searchCards)) {
    throw new Error(
      'Error fetching Pokemon sets cards from Limitless TCG: Invalid response format',
    );
  }

  const cards: (TcgPokemonCard & TcgPokemonSearchCard)[] = await Promise.all(
    searchCards.map(
      async (
        searchCard: TcgPokemonSearchCard,
      ): Promise<TcgPokemonCard & TcgPokemonSearchCard> => {
        try {
          const cardResponse: Response = await fetch(
            `https://limitlesstcg.com/api/cards/${encodeURIComponent(setCode)}/${encodeURIComponent(searchCard.number)}?lang=${language}`,
          );

          const cardJson: unknown = await cardResponse.json();

          if (!isPokemonCard(cardJson)) {
            throw new Error(
              'Error fetching Pokemon cards from Limitless TCG: Invalid response format',
            );
          }

          return {
            ...cardJson,
            ...searchCard,
          };
        } catch (error: unknown) {
          console.error(
            `Error fetching card ${searchCard.number} from set ${setCode} in language ${language}`,
          );
          throw error;
        }
      },
    ),
  );

  return cards;
}
