import { TcgPokemonType } from '../models/TcgPokemonType';
import { TcgPokemonTypeOrNone } from '../models/TcgPokemonTypeOrNone';

export function buildPokemonTypeArray(
  stringifiedType: string | null,
): TcgPokemonType[] {
  const types: TcgPokemonType[] = [];

  if (stringifiedType === null || stringifiedType === '') {
    return types;
  }

  const typeParts: string[] = stringifiedType.split('/');

  for (const typePart of typeParts) {
    if (typePart !== (TcgPokemonTypeOrNone.none as string)) {
      types.push(typePart as TcgPokemonType);
    }
  }

  return types;
}
