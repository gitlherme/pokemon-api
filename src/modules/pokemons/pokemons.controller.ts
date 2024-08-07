import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { IsDefined, Matches } from 'class-validator';

export class PokemonDTO {
  @Matches(/^[A-Za-z]+$/, { message: 'The Pokémon name needs to be a string' })
  @IsDefined({ message: 'The Pokémon needs a name' })
  name: string;
}

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get(':name')
  findOne(@Param() pokemonDTO: PokemonDTO) {
    return this.pokemonsService.findOne(pokemonDTO.name.toLowerCase());
  }
}
