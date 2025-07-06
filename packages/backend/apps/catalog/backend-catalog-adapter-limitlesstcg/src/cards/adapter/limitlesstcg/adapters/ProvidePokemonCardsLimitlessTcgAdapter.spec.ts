import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  type Mocked,
  vitest,
} from 'vitest';

vitest.mock('@atcga/limitlesstcg-game-data');

import {
  TcgPokemonCard,
  TcgPokemonCardSubtype,
  TcgPokemonCardType,
  TcgPokemonLanguage,
  TcgPokemonRegion,
  TcgPokemonSet,
} from '@atcga/backend-catalog-domain';
import { Builder } from '@atcga/backend-common';
import {
  getParsedSetCards,
  TcgPokemonCardSubtype as LimitlessTcgPokemonCardSubtype,
  TcgPokemonCardType as LimitlessTcgPokemonCardType,
  TcgPokemonParsedCard as LimitlessTcgPokemonCard,
  TcgPokemonRegion as LimitlessTcgPokemonRegion,
} from '@atcga/limitlesstcg-game-data';

import { ProvidePokemonCardsLimitlessTcgAdapter } from './ProvidePokemonCardsLimitlessTcgAdapter';

const mockedGetParsedSetCards: ReturnType<
  typeof vitest.mocked<typeof getParsedSetCards>
> = vitest.mocked(getParsedSetCards);

describe(ProvidePokemonCardsLimitlessTcgAdapter, () => {
  let limitlessTcgPokemonRegionFromPokemonRegionBuilderMock: Mocked<
    Builder<LimitlessTcgPokemonRegion, [TcgPokemonRegion]>
  >;
  let tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock: Mocked<
    Builder<
      TcgPokemonCard,
      [LimitlessTcgPokemonCard, LimitlessTcgPokemonRegion]
    >
  >;

  let providePokemonCardsLimitlessTcgAdapter: ProvidePokemonCardsLimitlessTcgAdapter;

  beforeAll(() => {
    limitlessTcgPokemonRegionFromPokemonRegionBuilderMock = {
      build: vitest.fn(),
    };
    tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock = {
      build: vitest.fn(),
    };

    providePokemonCardsLimitlessTcgAdapter =
      new ProvidePokemonCardsLimitlessTcgAdapter(
        limitlessTcgPokemonRegionFromPokemonRegionBuilderMock,
        tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock,
      );
  });

  describe('.providePokemonCards', () => {
    describe('having a set', () => {
      let setFixture: TcgPokemonSet;

      beforeAll(() => {
        setFixture = {
          code: 'BS',
          name: {
            [TcgPokemonLanguage.english]: 'Base Set',
          },
          region: TcgPokemonRegion.international,
        };
      });

      describe('when called', () => {
        let limitlessRegionFixture: LimitlessTcgPokemonRegion;
        let limitlessCardsFixture: LimitlessTcgPokemonCard[];
        let tcgCardsFixture: [TcgPokemonCard, TcgPokemonCard];

        let result: unknown;

        beforeAll(async () => {
          limitlessRegionFixture = LimitlessTcgPokemonRegion.int;
          limitlessCardsFixture = [
            {
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
            },
            {
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
            },
          ];

          tcgCardsFixture = [
            {
              cardType: TcgPokemonCardType.energy,
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
              rarity: undefined,
              region: TcgPokemonRegion.international,
              regulation: 'E',
              set: 'Base Set',
              type: TcgPokemonCardSubtype.basic,
            },
            {
              cardType: TcgPokemonCardType.trainer,
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
              rarity: undefined,
              region: TcgPokemonRegion.international,
              set: 'Base Set',
              type: TcgPokemonCardSubtype.supporter,
            },
          ];

          limitlessTcgPokemonRegionFromPokemonRegionBuilderMock.build.mockReturnValueOnce(
            limitlessRegionFixture,
          );

          mockedGetParsedSetCards.mockResolvedValueOnce(limitlessCardsFixture);

          tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock.build
            .mockReturnValueOnce(tcgCardsFixture[0])
            .mockReturnValueOnce(tcgCardsFixture[1]);

          result =
            await providePokemonCardsLimitlessTcgAdapter.providePokemonCards(
              setFixture,
            );
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call limitlessTcgPokemonRegionFromPokemonRegionBuilder.build()', () => {
          expect(
            limitlessTcgPokemonRegionFromPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledTimes(1);
          expect(
            limitlessTcgPokemonRegionFromPokemonRegionBuilderMock.build,
          ).toHaveBeenCalledWith(setFixture.region);
        });

        it('should call getParsedSetCards()', () => {
          expect(getParsedSetCards).toHaveBeenCalledTimes(1);
          expect(getParsedSetCards).toHaveBeenCalledWith(
            limitlessRegionFixture,
            setFixture.code,
          );
        });

        it('should call tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder.build() for each card', () => {
          expect(
            tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock.build,
          ).toHaveBeenCalledTimes(2);
          expect(
            tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock.build,
          ).toHaveBeenNthCalledWith(
            1,
            limitlessCardsFixture[0],
            limitlessRegionFixture,
          );
          expect(
            tcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilderMock.build,
          ).toHaveBeenNthCalledWith(
            2,
            limitlessCardsFixture[1],
            limitlessRegionFixture,
          );
        });

        it('should return an array of TcgPokemonCard', () => {
          expect(result).toStrictEqual(tcgCardsFixture);
        });
      });
    });
  });
});
