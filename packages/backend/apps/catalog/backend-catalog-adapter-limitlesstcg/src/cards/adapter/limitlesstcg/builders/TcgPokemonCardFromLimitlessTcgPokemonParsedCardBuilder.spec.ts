import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import {
  TcgPokemonEnergyCard,
  TcgPokemonLanguage,
  TcgPokemonRarity,
  TcgPokemonRegion,
  TcgPokemonTrainerCard,
} from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import {
  TcgPokemonCardSubtype as LimitlessTcgPokemonCardSubtype,
  TcgPokemonCardType as LimitlessTcgPokemonCardType,
  TcgPokemonParsedEnergyCard as LimitlessTcgPokemonEnergyCard,
  TcgPokemonParsedTrainerCard as LimitlessTcgPokemonTrainerCard,
  TcgPokemonRarity as LimitlessTcgPokemonRarity,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';

import { TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder } from './TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder';

describe(TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder, () => {
  let tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock: Mocked<
    Builder<TcgPokemonRarity, [LimitlessTcgPokemonRarity]>
  >;
  let tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock: Mocked<
    Builder<TcgPokemonRegion, [LimitlessTcgPokemonRegion]>
  >;

  let tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder: TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder;

  beforeAll(() => {
    tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock = {
      build: vitest.fn(),
    };
    tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock = {
      build: vitest.fn(),
    };

    tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder =
      new TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder(
        tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock,
        tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock,
      );
  });

  describe('.build', () => {
    describe('having an energy card with no rarity', () => {
      let energyCardFixture: LimitlessTcgPokemonEnergyCard;
      let limitlessRegionFixture: LimitlessTcgPokemonRegion;

      beforeAll(() => {
        energyCardFixture = {
          cardType: LimitlessTcgPokemonCardType.energy,
          effect: {
            [TcgPokemonLanguage.english]: 'Provides Fire Energy.',
          },
          imageUrls: {
            lg: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-lg.png',
            },
            sm: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-sm.png',
            },
            xs: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-xs.png',
            },
          },
          language: TcgPokemonLanguage.english,
          name: {
            [TcgPokemonLanguage.english]: 'Fire Energy',
          },
          number: '001',
          regulation: 'E',
          set: 'Base Set',
          type: LimitlessTcgPokemonCardSubtype.basic,
        };

        limitlessRegionFixture = LimitlessTcgPokemonRegion.int;
      });

      describe('when called', () => {
        let regionFixture: TcgPokemonRegion;

        let result: unknown;

        beforeAll(() => {
          regionFixture = TcgPokemonRegion.international;

          tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build.mockReturnValueOnce(
            regionFixture,
          );

          result = tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build(
            energyCardFixture,
            limitlessRegionFixture,
          );
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build()', () => {
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).not.toHaveBeenCalled();
        });

        it('should call tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build()', () => {
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledWith(limitlessRegionFixture);
        });

        it('should return a TcgPokemonEnergyCard', () => {
          const expected: TcgPokemonEnergyCard = {
            cardType: LimitlessTcgPokemonCardType.energy,
            effect: energyCardFixture.effect,
            imageUrls: energyCardFixture.imageUrls,
            language: energyCardFixture.language,
            name: energyCardFixture.name,
            number: energyCardFixture.number,
            rarity: undefined,
            region: regionFixture,
            regulation: energyCardFixture.regulation as string,
            set: energyCardFixture.set,
            type: energyCardFixture.type,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having an energy card with rarity', () => {
      let energyCardFixture: LimitlessTcgPokemonEnergyCard;
      let limitlessRegionFixture: LimitlessTcgPokemonRegion;

      beforeAll(() => {
        energyCardFixture = {
          cardType: LimitlessTcgPokemonCardType.energy,
          effect: {
            [TcgPokemonLanguage.english]: 'Provides Fire Energy.',
          },
          imageUrls: {
            lg: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-lg.png',
            },
            sm: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-sm.png',
            },
            xs: {
              [TcgPokemonLanguage.english]:
                'https://example.com/fire-energy-xs.png',
            },
          },
          language: TcgPokemonLanguage.english,
          name: {
            [TcgPokemonLanguage.english]: 'Fire Energy',
          },
          number: '001',
          rarity: LimitlessTcgPokemonRarity.common,
          regulation: 'E',
          set: 'Base Set',
          type: LimitlessTcgPokemonCardSubtype.basic,
        };

        limitlessRegionFixture = LimitlessTcgPokemonRegion.int;
      });

      describe('when called', () => {
        let rarityFixture: TcgPokemonRarity;
        let regionFixture: TcgPokemonRegion;

        let result: unknown;

        beforeAll(() => {
          rarityFixture = TcgPokemonRarity.common;
          regionFixture = TcgPokemonRegion.international;

          tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build.mockReturnValueOnce(
            rarityFixture,
          );

          tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build.mockReturnValueOnce(
            regionFixture,
          );

          result = tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build(
            energyCardFixture,
            limitlessRegionFixture,
          );
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build()', () => {
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).toHaveBeenCalledWith(energyCardFixture.rarity);
        });

        it('should call tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build()', () => {
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledWith(limitlessRegionFixture);
        });

        it('should return a TcgPokemonEnergyCard', () => {
          const expected: TcgPokemonEnergyCard = {
            cardType: LimitlessTcgPokemonCardType.energy,
            effect: energyCardFixture.effect,
            imageUrls: energyCardFixture.imageUrls,
            language: energyCardFixture.language,
            name: energyCardFixture.name,
            number: energyCardFixture.number,
            rarity: rarityFixture,
            region: regionFixture,
            regulation: energyCardFixture.regulation as string,
            set: energyCardFixture.set,
            type: energyCardFixture.type,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a trainer card with no rarity', () => {
      let trainerCardFixture: LimitlessTcgPokemonTrainerCard;
      let limitlessRegionFixture: LimitlessTcgPokemonRegion;

      beforeAll(() => {
        trainerCardFixture = {
          cardType: LimitlessTcgPokemonCardType.trainer,
          effect: {
            [TcgPokemonLanguage.english]: 'Draw 3 cards.',
          },
          imageUrls: {
            lg: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-lg.png',
            },
            sm: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-sm.png',
            },
            xs: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-xs.png',
            },
          },
          language: TcgPokemonLanguage.english,
          name: {
            [TcgPokemonLanguage.english]: 'Professor Oak',
          },
          number: '088',
          set: 'Base Set',
          type: LimitlessTcgPokemonCardSubtype.supporter,
        };

        limitlessRegionFixture = LimitlessTcgPokemonRegion.int;
      });

      describe('when called', () => {
        let regionFixture: TcgPokemonRegion;

        let result: unknown;

        beforeAll(() => {
          regionFixture = TcgPokemonRegion.international;

          tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build.mockReturnValueOnce(
            regionFixture,
          );

          result = tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build(
            trainerCardFixture,
            limitlessRegionFixture,
          );
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build()', () => {
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).not.toHaveBeenCalled();
        });

        it('should call tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build()', () => {
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledWith(limitlessRegionFixture);
        });

        it('should return a TcgPokemonTrainerCard', () => {
          const expected: TcgPokemonTrainerCard = {
            cardType: LimitlessTcgPokemonCardType.trainer,
            effect: trainerCardFixture.effect,
            imageUrls: trainerCardFixture.imageUrls,
            language: trainerCardFixture.language,
            name: trainerCardFixture.name,
            number: trainerCardFixture.number,
            rarity: undefined,
            region: regionFixture,
            set: trainerCardFixture.set,
            type: trainerCardFixture.type,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe('having a trainer card with rarity', () => {
      let trainerCardFixture: LimitlessTcgPokemonTrainerCard;
      let limitlessRegionFixture: LimitlessTcgPokemonRegion;

      beforeAll(() => {
        trainerCardFixture = {
          cardType: LimitlessTcgPokemonCardType.trainer,
          effect: {
            [TcgPokemonLanguage.english]: 'Draw 3 cards.',
          },
          imageUrls: {
            lg: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-lg.png',
            },
            sm: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-sm.png',
            },
            xs: {
              [TcgPokemonLanguage.english]:
                'https://example.com/professor-oak-xs.png',
            },
          },
          language: TcgPokemonLanguage.english,
          name: {
            [TcgPokemonLanguage.english]: 'Professor Oak',
          },
          number: '088',
          rarity: LimitlessTcgPokemonRarity.rare,
          set: 'Base Set',
          type: LimitlessTcgPokemonCardSubtype.supporter,
        };

        limitlessRegionFixture = LimitlessTcgPokemonRegion.int;
      });

      describe('when called', () => {
        let rarityFixture: TcgPokemonRarity;
        let regionFixture: TcgPokemonRegion;

        let result: unknown;

        beforeAll(() => {
          rarityFixture = TcgPokemonRarity.rare;
          regionFixture = TcgPokemonRegion.international;

          tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build.mockReturnValueOnce(
            rarityFixture,
          );

          tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build.mockReturnValueOnce(
            regionFixture,
          );

          result = tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build(
            trainerCardFixture,
            limitlessRegionFixture,
          );
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call tcgPokemonRarityFromLimitlessPokemonRarityBuilder.build()', () => {
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRarityFromLimitlessPokemonRarityBuilderMock.build,
          ).toHaveBeenCalledWith(trainerCardFixture.rarity);
        });

        it('should call tcgPokemonRegionFromLimitlessPokemonRegionBuilder.build()', () => {
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            tcgPokemonRegionFromLimitlessPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledWith(limitlessRegionFixture);
        });

        it('should return a TcgPokemonTrainerCard', () => {
          const expected: TcgPokemonTrainerCard = {
            cardType: LimitlessTcgPokemonCardType.trainer,
            effect: trainerCardFixture.effect,
            imageUrls: trainerCardFixture.imageUrls,
            language: trainerCardFixture.language,
            name: trainerCardFixture.name,
            number: trainerCardFixture.number,
            rarity: rarityFixture,
            region: regionFixture,
            set: trainerCardFixture.set,
            type: trainerCardFixture.type,
          };

          expect(result).toStrictEqual(expected);
        });
      });
    });
  });
});
