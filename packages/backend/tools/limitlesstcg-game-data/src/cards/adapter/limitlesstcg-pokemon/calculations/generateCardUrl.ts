import { TcgPokemonRegion } from '../../../../regions/adapter/limitlesstcg-pokemon/models/TcgPokemonRegion';
import { TcgPokemonCard } from '../models/TcgPokemonCard';

/**
 * Mapping of older set codes to their pokemontcg.io identifiers
 */
const OLD_SET_MAPPING: Record<string, string> = {
  AR: 'pl4',
  BG: 'bp',
  BS: 'base1',
  BS2: 'base4',
  CG: 'ex14',
  DF: 'ex15',
  DP: 'dp1',
  DPP: 'dpp',
  DR: 'ex3',
  DS: 'ex11',
  DX: 'ex8',
  E1: 'ecard1',
  E2: 'ecard2',
  E3: 'ecard3',
  EM: 'ex9',
  FO: 'base3',
  G1: 'gym1',
  G2: 'gym2',
  GE: 'dp4',
  HL: 'ex5',
  HP: 'ex13',
  JU: 'base2',
  LA: 'dp6',
  LC: 'base6',
  LM: 'ex12',
  MA: 'ex4',
  MD: 'dp5',
  MT: 'dp2',
  N1: 'neo1',
  N2: 'neo2',
  N3: 'neo3',
  N4: 'neo4',
  NP: 'np',
  P1: 'pop1',
  P2: 'pop2',
  P3: 'pop3',
  P4: 'pop4',
  P5: 'pop5',
  P6: 'pop6',
  P7: 'pop7',
  P8: 'pop8',
  P9: 'pop9',
  PK: 'ex16',
  PL: 'pl1',
  RG: 'ex6',
  RM: 'ru1',
  RR: 'pl2',
  RS: 'ex1',
  SF: 'dp7',
  SI: 'si1',
  SS: 'ex2',
  SV: 'pl3',
  SW: 'dp3',
  TR: 'base5',
  TRR: 'ex7',
  UF: 'ex10',
  WP: 'basep',
};

/**
 * Checks if the card is from an older set that should use the pokemontcg.io API
 * @param card The card to check
 * @returns True if the card is from an older set
 */
function isOlderSetCard(card: TcgPokemonCard): boolean {
  return card.region === TcgPokemonRegion.int && card.set in OLD_SET_MAPPING;
}

/**
 * Generates a URL for an older set card using the pokemontcg.io API
 * @param card The card to generate a URL for
 * @param size The size of the image (xs, sm, or default for high res)
 * @returns The URL for the card image
 */
function generateOlderSetCardUrl(
  card: TcgPokemonCard,
  size: 'xs' | 'sm' | null,
): string {
  const setCode: string | undefined = OLD_SET_MAPPING[card.set];

  if (setCode === undefined) {
    throw new Error(`Unknown set code for older set: ${card.set}`);
  }

  let number: string = card.number;

  // Handle special cases
  if (card.set === 'DPP') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    number = `DP${number.padStart(2, '0')}`;
  } else if (card.number === '?') {
    number = 'question';
  }

  // Only xs and sm sizes don't use high-res images
  if (size !== 'xs' && size !== 'sm') {
    number += '_hires';
  }

  return `https://images.pokemontcg.io/${setCode}/${number}.png`;
}

/**
 * Generates a URL for a newer set card using the limitlesstcg CDN
 * @param card The card to generate a URL for
 * @param size The size of the image
 * @returns The URL for the card image
 */
function generateNewerSetCardUrl(
  card: TcgPokemonCard,
  size: 'xs' | 'sm' | null,
): string {
  const cdnBaseUrl: string =
    'https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com';
  const sizeParam: string = size !== null ? `_${size.toUpperCase()}` : '';

  // For Japanese cards (region is 'tpc')
  if (card.region === TcgPokemonRegion.tpc) {
    return `${cdnBaseUrl}/tpc/${card.set}/${card.set}_${card.number}_R_JP${sizeParam}.png`;
  } else {
    // For international cards
    let language: string = card.language;

    // Default Japanese language to English for international cards
    if (language === 'jp') {
      language = 'en';
    }

    // Pad numbers with leading zeros as needed
    const formattedNumber: string = card.number.replace(
      /^(\d{1,2})(a|b)?$/,
      (_: string, num: string, suffix: string | null | undefined) =>
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        num.padStart(3, '0') + (suffix ?? ''),
    );

    return `${cdnBaseUrl}/tpci/${card.set}/${card.set}_${formattedNumber}_R_${language.toUpperCase()}${sizeParam}.png`;
  }
}

/**
 * Generates a URL for a Pokemon card image
 * @param card The Pokemon card to generate a URL for
 * @param size Optional size parameter for the image (xs, sm, etc.)
 * @param language Optional language code, defaults to "en" (English)
 * @returns The URL for the card image
 */
export function generateCardUrl(
  card: TcgPokemonCard,
  size: 'xs' | 'sm' | null = null,
): string {
  return isOlderSetCard(card)
    ? generateOlderSetCardUrl(card, size)
    : generateNewerSetCardUrl(card, size);
}
