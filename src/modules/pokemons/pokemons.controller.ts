import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { IsDefined, Matches } from 'class-validator';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class PokemonDTO {
  @Matches(/^[A-Za-z]+$/, { message: 'The Pokémon name needs to be a string' })
  @IsDefined({ message: 'The Pokémon needs a name' })
  @ApiProperty()
  name: string;
}

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get(':name')
  @ApiResponse({
    status: 200,
    description: 'Pokémon sucessfully found',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Pokémon was not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param() pokemonDTO: PokemonDTO) {
    return this.pokemonsService.findOne(pokemonDTO.name.toLowerCase());
  }
}
