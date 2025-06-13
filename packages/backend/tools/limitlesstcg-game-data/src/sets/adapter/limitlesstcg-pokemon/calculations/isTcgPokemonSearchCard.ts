import { isPokemonCardType } from '../../../../cards/adapter/limitlesstcg-pokemon/calculations/isPokemonCardType';
import { TcgPokemonSearchCard } from '../../../../cards/adapter/limitlesstcg-pokemon/models/TcgPokemonSearchCard';
import { isStringOrNull } from '../../../../foundation/domain/calculations/isStringOrNull';

export function isTcgPokemonSearchCard(
  card: unknown,
): card is TcgPokemonSearchCard {
  return (
    typeof card === 'object' &&
    card !== null &&
    isPokemonCardType((card as Partial<TcgPokemonSearchCard>).card_type) &&
    typeof (card as Partial<TcgPokemonSearchCard>).id === 'number' &&
    typeof (card as Partial<TcgPokemonSearchCard>).name === 'string' &&
    typeof (card as Partial<TcgPokemonSearchCard>).number === 'string' &&
    typeof (card as Partial<TcgPokemonSearchCard>).region === 'string' &&
    typeof (card as Partial<TcgPokemonSearchCard>).set === 'string' &&
    typeof (card as Partial<TcgPokemonSearchCard>).translation === 'number' &&
    isStringOrNull((card as Partial<TcgPokemonSearchCard>).special)
  );
}
