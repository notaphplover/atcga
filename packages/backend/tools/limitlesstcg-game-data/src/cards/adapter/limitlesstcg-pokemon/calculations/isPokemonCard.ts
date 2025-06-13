import { isNumberOrNull } from '../../../../foundation/domain/calculations/isNumberOrNull';
import { isStringOrNull } from '../../../../foundation/domain/calculations/isStringOrNull';
import { TcgPokemonLanguage } from '../../../../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { isPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/calculations/isPokemonRegion';
import { TcgPokemonCard } from '../models/TcgPokemonCard';
import { isPokemonCardType } from './isPokemonCardType';
import { isTcgPokemonCardTypeOrNoneArray } from './isPokemonCardTypeOrNoneArray';
import { isPokemonRarity } from './isPokemonRarity';
import { isPokemonStage } from './isPokemonStage';
import { isPokemonType } from './isPokemonType';

export function isPokemonCard(card: unknown): card is TcgPokemonCard {
  // Enhanced validation with property checking
  if (typeof card !== 'object' || card === null) {
    console.error('Card validation failed: not an object or null');
    return false;
  }

  const c: Partial<TcgPokemonCard> = card as Partial<TcgPokemonCard>;

  // Check each property and log failures
  const validations: {
    prop: keyof TcgPokemonCard;
    valid: boolean;
  }[] = [
    { prop: 'a1_cost', valid: isStringOrNull(c.a1_cost) },
    { prop: 'a1_dmg', valid: isStringOrNull(c.a1_dmg) },
    { prop: 'a1_effect', valid: isStringOrNull(c.a1_effect) },
    { prop: 'a1_name', valid: isStringOrNull(c.a1_name) },
    { prop: 'a2_cost', valid: isStringOrNull(c.a2_cost) },
    { prop: 'a2_dmg', valid: isStringOrNull(c.a2_dmg) },
    { prop: 'a2_effect', valid: isStringOrNull(c.a2_effect) },
    { prop: 'a2_name', valid: isStringOrNull(c.a2_name) },
    { prop: 'a3_cost', valid: isStringOrNull(c.a3_cost) },
    { prop: 'a3_dmg', valid: isStringOrNull(c.a3_dmg) },
    { prop: 'a3_effect', valid: isStringOrNull(c.a3_effect) },
    { prop: 'a3_name', valid: isStringOrNull(c.a3_name) },
    { prop: 'a4_cost', valid: isStringOrNull(c.a4_cost) },
    { prop: 'a4_dmg', valid: isStringOrNull(c.a4_dmg) },
    { prop: 'a4_effect', valid: isStringOrNull(c.a4_effect) },
    { prop: 'a4_name', valid: isStringOrNull(c.a4_name) },
    { prop: 'ability_effect', valid: isStringOrNull(c.ability_effect) },
    { prop: 'ability_name', valid: isStringOrNull(c.ability_name) },
    { prop: 'card_type', valid: isPokemonCardType(c.card_type) },
    { prop: 'cm_price', valid: isNumberOrNull(c.cm_price) },
    { prop: 'cm_url', valid: isStringOrNull(c.cm_url) },
    { prop: 'effect', valid: isStringOrNull(c.effect) },
    { prop: 'hp', valid: isNumberOrNull(c.hp) },
    {
      prop: 'language',
      valid:
        c.language !== undefined &&
        Object.values(TcgPokemonLanguage).includes(c.language),
    },
    { prop: 'market_price', valid: isNumberOrNull(c.market_price) },
    { prop: 'name', valid: typeof c.name === 'string' },
    { prop: 'number', valid: typeof c.number === 'string' },
    { prop: 'rarity', valid: isPokemonRarity(c.rarity) },
    { prop: 'region', valid: isPokemonRegion(c.region) },
    { prop: 'regulation', valid: isStringOrNull(c.regulation) },
    {
      prop: 'resistance',
      valid: isTcgPokemonCardTypeOrNoneArray(c.resistance),
    },
    { prop: 'retreat', valid: isNumberOrNull(c.retreat) },
    { prop: 'set', valid: typeof c.set === 'string' },
    { prop: 'stage', valid: isPokemonStage(c.stage) },
    { prop: 'tcgplayer_url', valid: isStringOrNull(c.tcgplayer_url) },
    { prop: 'translation', valid: typeof c.translation === 'number' },
    { prop: 'trait_name', valid: isStringOrNull(c.trait_name) },
    { prop: 'trait_effect', valid: isStringOrNull(c.trait_effect) },
    { prop: 'type', valid: isPokemonType(c.type) },
    { prop: 'weakness', valid: isTcgPokemonCardTypeOrNoneArray(c.weakness) },
  ];

  // Find failing validations and log them
  const failures: {
    prop: keyof TcgPokemonCard;
    valid: boolean;
  }[] = validations.filter(
    (v: { prop: keyof TcgPokemonCard; valid: boolean }) => !v.valid,
  );
  if (failures.length > 0) {
    console.log(
      `Card ${c.name ?? ''} ${c.set ?? ''}/${c.number?.toString() ?? ''} validation failed`,
    );

    console.error(
      'Card validation failed for properties:',
      failures
        .map((f: { prop: keyof TcgPokemonCard; valid: boolean }) => f.prop)
        .join(', '),
    );

    for (const failure of failures) {
      console.error(`Property ${failure.prop} has value:`, c[failure.prop]);
    }

    return false;
  }

  return true;
}
