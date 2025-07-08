import { I18nString } from '../../../../common/domain/models/I18nString';
import { TcgPokemonLanguage } from '../../../../languages/adapter/limitlesstcg-pokemon/models/TcgPokemonLanguage';
import { TcgPokemonCardSubtype } from './TcgPokemonCardSubtype';
import { TcgPokemonCardType } from './TcgPokemonCardType';
import { TcgPokemonRarity } from './TcgPokemonRarity';
import { TcgPokemonStage } from './TcgPokemonStage';
import { TcgPokemonType } from './TcgPokemonType';

export interface BaseTcgPokemonParsedCard<TType extends TcgPokemonCardType> {
  cardType: TType;
  imageUrls: {
    xs: I18nString<TcgPokemonLanguage>;
    sm: I18nString<TcgPokemonLanguage>;
    lg: I18nString<TcgPokemonLanguage>;
  };
  languages: TcgPokemonLanguage[];
  name: I18nString<TcgPokemonLanguage>;
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
  effect: I18nString<TcgPokemonLanguage>;
  name: I18nString<TcgPokemonLanguage>;
}

export interface TcgPokemonParsedEnergyCard
  extends BaseTcgPokemonParsedCard<TcgPokemonCardType.energy> {
  effect: I18nString<TcgPokemonLanguage>;
  type: TcgPokemonCardSubtype.basic | TcgPokemonCardSubtype.special;
}

export interface TcgPokemonParsedPokemonCard
  extends BaseTcgPokemonParsedCard<TcgPokemonCardType.pokemon> {
  abilityName?: I18nString<TcgPokemonLanguage> | undefined;
  abilityEffect?: I18nString<TcgPokemonLanguage> | undefined;
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
  effect: I18nString<TcgPokemonLanguage>;
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
