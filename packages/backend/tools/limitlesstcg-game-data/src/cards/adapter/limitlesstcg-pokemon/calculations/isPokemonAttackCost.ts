import { isStringEnum } from '../../../../foundation/domain/calculations/isStringEnum';
import { TcgPokemonParsedPokemonCardAttackCostType } from '../models/TcgPokemonParsedCard';

const isPokemonAttackCostType: (
  value: unknown,
) => value is TcgPokemonParsedPokemonCardAttackCostType = isStringEnum(
  TcgPokemonParsedPokemonCardAttackCostType,
);

export function isPokemonAttackCost(value: unknown): value is string | null {
  if (value === null) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  if (value.endsWith('+')) {
    return isPokemonAttackCost(value.slice(0, -1));
  }

  return value === '0' || value.split('').every(isPokemonAttackCostType);
}
