import { Controller, Get, Param } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.pokemonsService.findOne(name);
  }
}
