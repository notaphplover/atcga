import { providePokemonCardsPortSymbol } from '@atcga/backend-catalog-application';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { ProvidePokemonCardsLimitlessTcgAdapter } from '../../limitlesstcg/adapters/ProvidePokemonCardsLimitlessTcgAdapter';
import { TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder } from '../../limitlesstcg/builders/TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder';
import { TcgPokemonRarityFromLimitlessPokemonRarityBuilder } from '../../limitlesstcg/builders/TcgPokemonRarityFromLimitlessPokemonRarityBuilder';

export class CardsLimitlessTcgModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions) => {
      options
        .bind(providePokemonCardsPortSymbol)
        .to(ProvidePokemonCardsLimitlessTcgAdapter)
        .inSingletonScope();
      options
        .bind(TcgPokemonCardFromLimitlessTcgPokemonParsedCardBuilder)
        .toSelf()
        .inSingletonScope();
      options
        .bind(TcgPokemonRarityFromLimitlessPokemonRarityBuilder)
        .toSelf()
        .inSingletonScope();
    });
  }
}
