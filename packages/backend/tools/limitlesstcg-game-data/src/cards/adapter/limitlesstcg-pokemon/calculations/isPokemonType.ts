import { isStringOfAnyEnums } from '../../../../foundation/domain/calculations/isStringOfAnyEnums';
import { TcgPokemonCardSubtype } from '../models/TcgPokemonCardSubtype';
import { TcgPokemonCardType } from '../models/TcgPokemonCardType';
import { isTcgPokemonTypeArray } from './isTcgPokemonTypeArray';

const isTcgPokemonCardTypeOrSubtype: (
  value: unknown,
) => value is TcgPokemonCardType | TcgPokemonCardSubtype = isStringOfAnyEnums<
  TcgPokemonCardType | TcgPokemonCardSubtype
>(TcgPokemonCardType, TcgPokemonCardSubtype);

export const isPokemonType: (value: unknown) => value is string = (
  value: unknown,
): value is string =>
  isTcgPokemonCardTypeOrSubtype(value) || isTcgPokemonTypeArray(value);
