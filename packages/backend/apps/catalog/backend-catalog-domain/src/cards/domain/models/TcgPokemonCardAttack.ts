import { I18nString } from '../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../languages/domain/models/TcgPokemonLanguage';

export interface TcgPokemonCardAttackCost {
  elements: TcgPokemonCardAttackCostKind[];
}

export enum TcgPokemonCardAttackCostKind {
  colorless = 'colorless',
  grass = 'grass',
  fire = 'fire',
  water = 'water',
  lightning = 'lightning',
  psychic = 'psychic',
  fighting = 'fighting',
  darkness = 'darkness',
  metal = 'metal',
  fairy = 'fairy',
}

export interface TcgPokemonCardAttack {
  cost?: TcgPokemonCardAttackCost | undefined;
  damage?: string | undefined;
  effect: I18nString<TcgPokemonLanguage>;
  name: I18nString<TcgPokemonLanguage>;
}
