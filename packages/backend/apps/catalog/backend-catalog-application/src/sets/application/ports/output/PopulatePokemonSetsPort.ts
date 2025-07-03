import { TcgPokemonSet } from '@atcga/backend-catalog-domain';

export const populatePokemonSetsPortSymbol: symbol = Symbol.for(
  'PopulatePokemonSetsPort',
);

export interface PopulatePokemonSetsPort {
  populatePokemonSets(): Promise<TcgPokemonSet[]>;
}
