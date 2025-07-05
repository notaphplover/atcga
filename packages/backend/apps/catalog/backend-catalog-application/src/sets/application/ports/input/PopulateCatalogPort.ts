import { inject, injectable } from 'inversify';

import {
  PopulatePokemonSetsPort,
  populatePokemonSetsPortSymbol,
} from '../output/PopulatePokemonSetsPort';

@injectable()
export class PopulateCatalogPort {
  readonly #populatePokemonSetsPort: PopulatePokemonSetsPort;

  constructor(
    @inject(populatePokemonSetsPortSymbol)
    populatePokemonSetsPort: PopulatePokemonSetsPort,
  ) {
    this.#populatePokemonSetsPort = populatePokemonSetsPort;
  }

  public async populateCatalog(): Promise<void> {
    await this.#populatePokemonSetsPort.populatePokemonSets();
  }
}
