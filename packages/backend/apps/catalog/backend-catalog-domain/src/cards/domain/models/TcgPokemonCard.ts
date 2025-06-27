import { TcgPokemonEnergyCard } from './TcgPokemonEnergyCard';
import { TcgPokemonPokemonCard } from './TcgPokemonPokemonCard';
import { TcgPokemonTrainerCard } from './TcgPokemonTrainerCard';

export type TcgPokemonCard =
  | TcgPokemonEnergyCard
  | TcgPokemonPokemonCard
  | TcgPokemonTrainerCard;
