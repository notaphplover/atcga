import { TcgPokemonRegion, TcgPokemonSet } from '@atcga/backend-catalog-domain';

export const providePokemonSetsPortSymbol: symbol = Symbol.for(
  'ProvidePokemonSetsPort',
);

export interface ProvidePokemonSetsPort {
  providePokemonSets(region: TcgPokemonRegion): Promise<TcgPokemonSet[]>;
}
