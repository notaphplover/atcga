import { TcgPokemonCard, TcgPokemonSet } from '@atcga/backend-catalog-domain';

export const providePokemonCardsPortSymbol: symbol = Symbol.for(
  'ProvidePokemonCardsPort',
);

export interface ProvidePokemonCardsPort {
  providePokemonCards(set: TcgPokemonSet): Promise<TcgPokemonCard[]>;
}
