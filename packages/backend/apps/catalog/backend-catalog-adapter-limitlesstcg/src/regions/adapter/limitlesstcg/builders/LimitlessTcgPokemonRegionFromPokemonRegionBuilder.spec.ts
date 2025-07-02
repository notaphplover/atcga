import { beforeAll, describe, expect, it } from 'vitest';

import { TcgPokemonRegion } from '@atcga/backend-catalog-domain';
import { TcgPokemonRegion as LimitlessTcgPokemonRegion } from '@atcga/limitlesstcg-game-data';

import { LimitlessTcgPokemonRegionFromPokemonRegionBuilder } from './LimitlessTcgPokemonRegionFromPokemonRegionBuilder';

describe(LimitlessTcgPokemonRegionFromPokemonRegionBuilder, () => {
  let limitlessTcgPokemonRegionFromPokemonRegionBuilder: LimitlessTcgPokemonRegionFromPokemonRegionBuilder;

  beforeAll(() => {
    limitlessTcgPokemonRegionFromPokemonRegionBuilder =
      new LimitlessTcgPokemonRegionFromPokemonRegionBuilder();
  });

  describe('.build', () => {
    describe.each([
      [TcgPokemonRegion.international, LimitlessTcgPokemonRegion.int],
      [TcgPokemonRegion.japan, LimitlessTcgPokemonRegion.tpc],
    ])(
      'having region %s',
      (region: TcgPokemonRegion, expected: LimitlessTcgPokemonRegion) => {
        let result: unknown;

        beforeAll(() => {
          result =
            limitlessTcgPokemonRegionFromPokemonRegionBuilder.build(region);
        });

        it(`should return ${expected}`, () => {
          expect(result).toBe(expected);
        });
      },
    );
  });
});
