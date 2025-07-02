import { TcgPokemonRegion, TcgPokemonSet } from '@atcga/backend-catalog-domain';

export const provideSetsPortSymbol: symbol = Symbol.for('ProvideSetsPort');

export interface ProvideSetsPort {
  provideSets(region: TcgPokemonRegion): Promise<TcgPokemonSet[]>;
}
