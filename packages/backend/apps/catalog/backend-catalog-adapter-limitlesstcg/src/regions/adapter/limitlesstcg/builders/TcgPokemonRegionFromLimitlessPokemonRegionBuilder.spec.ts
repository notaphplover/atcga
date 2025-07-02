import { beforeAll, describe, expect, it } from 'vitest';

import { TcgPokemonRegion } from '@atcga/backend-catalog-domain';
import { TcgPokemonRegion as LimitlessTcgPokemonRegion } from '@atcga/limitlesstcg-game-data';

import { TcgPokemonRegionFromLimitlessPokemonRegionBuilder } from './TcgPokemonRegionFromLimitlessPokemonRegionBuilder';

describe(TcgPokemonRegionFromLimitlessPokemonRegionBuilder, () => {
  let tcgPokemonRegionFromLimitlessPokemonRegionBuilder: TcgPokemonRegionFromLimitlessPokemonRegionBuilder;

  beforeAll(() => {
    tcgPokemonRegionFromLimitlessPokemonRegionBuilder =
      new TcgPokemonRegionFromLimitlessPokemonRegionBuilder();
  });

  describe('.build', () => {
    describe.each([
      [LimitlessTcgPokemonRegion.int, TcgPokemonRegion.international],
      [LimitlessTcgPokemonRegion.tpc, TcgPokemonRegion.japan],
    ])(
      'having region %s',
      (region: LimitlessTcgPokemonRegion, expected: TcgPokemonRegion) => {
        let result: unknown;

        beforeAll(() => {
          result =
            tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build(region);
        });

        it(`should return ${expected}`, () => {
          expect(result).toBe(expected);
        });
      },
    );
  });
});
