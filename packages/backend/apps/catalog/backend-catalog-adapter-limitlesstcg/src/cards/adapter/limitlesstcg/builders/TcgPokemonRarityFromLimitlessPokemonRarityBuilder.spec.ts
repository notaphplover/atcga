import { beforeAll, describe, expect, it } from 'vitest';

import { TcgPokemonRarity } from '@atcga/backend-catalog-domain';
import { TcgPokemonRarity as LimitlessTcgPokemonRarity } from '@atcga/limitlesstcg-game-data';

import { TcgPokemonRarityFromLimitlessPokemonRarityBuilder } from './TcgPokemonRarityFromLimitlessPokemonRarityBuilder';

describe(TcgPokemonRarityFromLimitlessPokemonRarityBuilder, () => {
  let tcgPokemonRarityFromLimitlessPokemonRarityBuilder: TcgPokemonRarityFromLimitlessPokemonRarityBuilder;

  beforeAll(() => {
    tcgPokemonRarityFromLimitlessPokemonRarityBuilder =
      new TcgPokemonRarityFromLimitlessPokemonRarityBuilder();
  });

  describe('.build', () => {
    describe.each([
      [LimitlessTcgPokemonRarity.amazingRare, TcgPokemonRarity.amazingRare],
      [LimitlessTcgPokemonRarity.artRare, TcgPokemonRarity.artRare],
      [LimitlessTcgPokemonRarity.common, TcgPokemonRarity.common],
      [
        LimitlessTcgPokemonRarity.characterHoloRare,
        TcgPokemonRarity.characterHoloRare,
      ],
      [
        LimitlessTcgPokemonRarity.characterSuperRare,
        TcgPokemonRarity.characterSuperRare,
      ],
      [LimitlessTcgPokemonRarity.doubleRare, TcgPokemonRarity.doubleRare],
      [LimitlessTcgPokemonRarity.holoRare, TcgPokemonRarity.holoRare],
      [LimitlessTcgPokemonRarity.radiantRare, TcgPokemonRarity.radiantRare],
      [LimitlessTcgPokemonRarity.rare, TcgPokemonRarity.rare],
      [LimitlessTcgPokemonRarity.rainbowRare, TcgPokemonRarity.rainbowRare],
      [LimitlessTcgPokemonRarity.secretRare, TcgPokemonRarity.secretRare],
      [LimitlessTcgPokemonRarity.shinyRare, TcgPokemonRarity.shinyRare],
      [
        LimitlessTcgPokemonRarity.shinyUltraRare,
        TcgPokemonRarity.shinyUltraRare,
      ],
      [
        LimitlessTcgPokemonRarity.specialArtRare,
        TcgPokemonRarity.specialArtRare,
      ],
      [LimitlessTcgPokemonRarity.tripleRare, TcgPokemonRarity.tripleRare],
      [LimitlessTcgPokemonRarity.ultraRare, TcgPokemonRarity.ultraRare],
      [LimitlessTcgPokemonRarity.uncommon, TcgPokemonRarity.uncommon],
    ])(
      'having rarity %s',
      (rarity: LimitlessTcgPokemonRarity, expected: TcgPokemonRarity) => {
        let result: unknown;

        beforeAll(() => {
          result =
            tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build(rarity);
        });

        it(`should return ${expected}`, () => {
          expect(result).toBe(expected);
        });
      },
    );
  });
});
