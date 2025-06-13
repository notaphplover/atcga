import { isArrayOf } from '../../../../foundation/domain/calculations/isArrayOf';
import { TcgPokemonSet } from '../models/TcgPokemonSet';
import { isSet } from './isPokemonSet';

export const isSetArray: (array: unknown) => array is TcgPokemonSet[] =
  isArrayOf(isSet);
