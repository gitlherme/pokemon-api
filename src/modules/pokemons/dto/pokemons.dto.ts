import { Ability, Pokemon, Type } from '../entities/pokemon.entity';

export interface IPokemonOutput {
  id: number;
  abilities: Ability[];
  name: string;
  sprite: string;
  types: Type[];
}

export class PokemonDataMapper {
  static output(pokemon: Pokemon): IPokemonOutput {
    return {
      id: Number(pokemon.id),
      abilities: pokemon.abilities,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types,
    };
  }
}
