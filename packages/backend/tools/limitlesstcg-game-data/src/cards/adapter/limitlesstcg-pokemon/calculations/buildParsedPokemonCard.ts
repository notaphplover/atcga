import { TcgPokemonCard } from '../models/TcgPokemonCard';
import { TcgPokemonCardSubtype } from '../models/TcgPokemonCardSubtype';
import { TcgPokemonCardType } from '../models/TcgPokemonCardType';
import {
  I18nString,
  TcgPokemonParsedCard,
  TcgPokemonParsedPokemonCardAttack,
} from '../models/TcgPokemonParsedCard';
import { buildPokemonTypeArray } from './buildPokemonTypeArray';
import { generateCardUrl } from './generateCardUrl';

function buildCardName(cardList: TcgPokemonCard[]): I18nString {
  return cardList.reduce(
    (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
      i18nString[card.language] = card.name;
      return i18nString;
    },
    {},
  );
}

function buildCardEffect(cardList: TcgPokemonCard[]): I18nString {
  return cardList.reduce(
    (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
      if (card.effect !== null) {
        i18nString[card.language] = card.effect;
      }
      return i18nString;
    },
    {},
  );
}

function buildEnergyType(
  type: string,
): TcgPokemonCardSubtype.basic | TcgPokemonCardSubtype.special {
  if (
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.basic &&
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.special
  ) {
    throw new Error(`Invalid energy type: ${type}`);
  }

  return type as TcgPokemonCardSubtype.basic | TcgPokemonCardSubtype.special;
}

function buildImageUrls(cardList: TcgPokemonCard[]): {
  lg: I18nString;
  sm: I18nString;
  xs: I18nString;
} {
  return {
    lg: cardList.reduce(
      (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
        i18nString[card.language] = generateCardUrl(card, null);

        return i18nString;
      },
      {},
    ),
    sm: cardList.reduce(
      (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
        i18nString[card.language] = generateCardUrl(card, 'sm');

        return i18nString;
      },
      {},
    ),
    xs: cardList.reduce(
      (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
        i18nString[card.language] = generateCardUrl(card, 'xs');

        return i18nString;
      },
      {},
    ),
  };
}

function buildPokemonAttacks(
  cardList: TcgPokemonCard[],
): TcgPokemonParsedPokemonCardAttack[] {
  const [firstCard]: TcgPokemonCard[] = cardList;

  if (firstCard === undefined) {
    throw new Error('No cards found in the provided card list');
  }

  return [
    {
      cost: firstCard.a1_cost ?? undefined,
      dmg: firstCard.a1_dmg ?? undefined,
      effect: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a1_effect !== null) {
            i18nString[card.language] = card.a1_effect;
          }

          return i18nString;
        },
        {},
      ),
      name: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a1_name !== null) {
            i18nString[card.language] = card.a1_name;
          }

          return i18nString;
        },
        {},
      ),
    },
    {
      cost: firstCard.a2_cost ?? undefined,
      dmg: firstCard.a2_dmg ?? undefined,
      effect: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a2_effect !== null) {
            i18nString[card.language] = card.a2_effect;
          }

          return i18nString;
        },
        {},
      ),
      name: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a2_name !== null) {
            i18nString[card.language] = card.a2_name;
          }

          return i18nString;
        },
        {},
      ),
    },
    {
      cost: firstCard.a3_cost ?? undefined,
      dmg: firstCard.a3_dmg ?? undefined,
      effect: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a3_effect !== null) {
            i18nString[card.language] = card.a3_effect;
          }

          return i18nString;
        },
        {},
      ),
      name: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a3_name !== null) {
            i18nString[card.language] = card.a3_name;
          }

          return i18nString;
        },
        {},
      ),
    },
    {
      cost: firstCard.a4_cost ?? undefined,
      dmg: firstCard.a4_dmg ?? undefined,
      effect: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a4_effect !== null) {
            i18nString[card.language] = card.a4_effect;
          }

          return i18nString;
        },
        {},
      ),
      name: cardList.reduce(
        (i18nString: I18nString, card: TcgPokemonCard): I18nString => {
          if (card.a4_name !== null) {
            i18nString[card.language] = card.a4_name;
          }

          return i18nString;
        },
        {},
      ),
    },
  ].filter(
    (attack: TcgPokemonParsedPokemonCardAttack) =>
      attack.cost !== undefined && attack.dmg !== undefined,
  );
}

function buildTrainerType(
  type: string,
):
  | TcgPokemonCardSubtype.item
  | TcgPokemonCardSubtype.itemTm
  | TcgPokemonCardSubtype.supporter
  | TcgPokemonCardSubtype.stadium
  | TcgPokemonCardSubtype.tool {
  if (
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.item &&
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.itemTm &&
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.supporter &&
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.stadium &&
    (type as TcgPokemonCardSubtype) !== TcgPokemonCardSubtype.tool
  ) {
    throw new Error(`Invalid trainer type: ${type}`);
  }

  return type as
    | TcgPokemonCardSubtype.item
    | TcgPokemonCardSubtype.itemTm
    | TcgPokemonCardSubtype.supporter
    | TcgPokemonCardSubtype.stadium
    | TcgPokemonCardSubtype.tool;
}

export function buildParsedPokemonCard(
  cardList: TcgPokemonCard[],
): TcgPokemonParsedCard {
  const [firstCard]: TcgPokemonCard[] = cardList;

  if (firstCard === undefined) {
    throw new Error('No cards found in the provided card list');
  }

  switch (firstCard.card_type) {
    case TcgPokemonCardType.energy:
      return {
        cardType: firstCard.card_type,
        effect: buildCardEffect(cardList),
        imageUrls: buildImageUrls(cardList),
        language: firstCard.language,
        name: buildCardName(cardList),
        number: firstCard.number,
        rarity:
          firstCard.rarity === '' ? undefined : (firstCard.rarity ?? undefined),
        regulation: firstCard.regulation ?? undefined,
        set: firstCard.set,
        type: buildEnergyType(firstCard.type),
      };
    case TcgPokemonCardType.pokemon:
      return {
        abilityEffect: firstCard.ability_effect ?? undefined,
        abilityName: firstCard.ability_name ?? undefined,
        attacks: buildPokemonAttacks(cardList),
        cardType: firstCard.card_type,
        hp: firstCard.hp ?? 0,
        imageUrls: buildImageUrls(cardList),
        language: firstCard.language,
        name: buildCardName(cardList),
        number: firstCard.number,
        rarity:
          firstCard.rarity === '' ? undefined : (firstCard.rarity ?? undefined),
        regulation: firstCard.regulation ?? undefined,
        resistance: buildPokemonTypeArray(firstCard.resistance),
        retreat: firstCard.retreat ?? undefined,
        set: firstCard.set,
        stage: firstCard.stage ?? undefined,
        traitEffect: firstCard.trait_effect ?? undefined,
        traitName: firstCard.trait_name ?? undefined,
        type: buildPokemonTypeArray(firstCard.type),
        weakness: buildPokemonTypeArray(firstCard.weakness),
      };
    case TcgPokemonCardType.trainer:
      return {
        cardType: firstCard.card_type,
        effect: buildCardEffect(cardList),
        imageUrls: buildImageUrls(cardList),
        language: firstCard.language,
        name: buildCardName(cardList),
        number: firstCard.number,
        rarity:
          firstCard.rarity === '' ? undefined : (firstCard.rarity ?? undefined),
        regulation: firstCard.regulation ?? undefined,
        set: firstCard.set,
        type: buildTrainerType(firstCard.type),
      };
  }
}
