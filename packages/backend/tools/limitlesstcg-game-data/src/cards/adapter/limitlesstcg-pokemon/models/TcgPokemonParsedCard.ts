import { TcgPokemonLanguage } from '../../../../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { TcgPokemonCardSubtype } from './TcgPokemonCardSubtype';
import { TcgPokemonCardType } from './TcgPokemonCardType';
import { TcgPokemonRarity } from './TcgPokemonRarity';
import { TcgPokemonStage } from './TcgPokemonStage';
import { TcgPokemonType } from './TcgPokemonType';

export type I18nString = {
  [TLang in TcgPokemonLanguage]?: string;
};

export interface BaseTcgPokemonParsedCard<TType extends TcgPokemonCardType> {
  cardType: TType;
  imageUrls: {
    xs: I18nString;
    sm: I18nString;
    lg: I18nString;
  };
  language: string;
  name: I18nString;
  number: string;
  rarity?: TcgPokemonRarity | undefined;
  regulation?: string | undefined;
  set: string;
}

export enum TcgPokemonParsedPokemonCardAttackCostType {
  colorless = 'c',
  darkness = 'd',
  fairy = 'y',
  fighting = 'f',
  fire = 'r',
  grass = 'g',
  lightning = 'l',
  metal = 'm',
  psychic = 'p',
  water = 'w',
}

export interface TcgPokemonParsedPokemonCardAttack {
  cost?: TcgPokemonParsedPokemonCardAttackCostType[] | undefined;
  dmg?: string | undefined;
  effect: I18nString;
  name: I18nString;
}

export interface TcgPokemonParsedEnergyCard
  extends BaseTcgPokemonParsedCard<TcgPokemonCardType.energy> {
  effect: I18nString;
  type: TcgPokemonCardSubtype.basic | TcgPokemonCardSubtype.special;
}

export interface TcgPokemonParsedPokemonCard
  extends BaseTcgPokemonParsedCard<TcgPokemonCardType.pokemon> {
  abilityName?: I18nString | undefined;
  abilityEffect?: I18nString | undefined;
  attacks: TcgPokemonParsedPokemonCardAttack[];
  hp: number;
  resistance: TcgPokemonType[];
  retreat?: number | undefined;
  stage?: TcgPokemonStage | undefined;
  traitName?: string | undefined;
  traitEffect?: string | undefined;
  type: TcgPokemonType[];
  weakness: TcgPokemonType[];
}

export interface TcgPokemonParsedTrainerCard
  extends BaseTcgPokemonParsedCard<TcgPokemonCardType.trainer> {
  effect: I18nString;
  type:
    | TcgPokemonCardSubtype.item
    | TcgPokemonCardSubtype.itemTm
    | TcgPokemonCardSubtype.supporter
    | TcgPokemonCardSubtype.stadium
    | TcgPokemonCardSubtype.tool;
}

export type TcgPokemonParsedCard =
  | TcgPokemonParsedEnergyCard
  | TcgPokemonParsedPokemonCard
  | TcgPokemonParsedTrainerCard;
