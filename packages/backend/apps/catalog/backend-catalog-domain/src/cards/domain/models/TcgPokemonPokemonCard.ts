import { BaseTcgPokemonCard } from './BaseTcgPokemonCard';
import { TcgPokemonCardAttack } from './TcgPokemonCardAttack';
import { TcgPokemonCardType } from './TcgPokemonCardType';
import { TcgPokemonStage } from './TcgPokemonStage';
import { TcgPokemonType } from './TcgPokemonType';

export interface TcgPokemonPokemonCard
  extends BaseTcgPokemonCard<TcgPokemonCardType.pokemon> {
  abilityName?: string | undefined;
  abilityEffect?: string | undefined;
  attacks: TcgPokemonCardAttack[];
  hp: number;
  resistance: TcgPokemonType[];
  retreat?: number | undefined;
  stage?: TcgPokemonStage | undefined;
  traitName?: string | undefined;
  traitEffect?: string | undefined;
  type: TcgPokemonType[];
  weakness: TcgPokemonType[];
}
