import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PokemonDataMapper } from './dto/pokemons.dto';
import { Ability, Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(name: string) {
    const { data } = await this.httpService.axiosRef.get<Pokemon>(
      `${this.configService.get<string>('BASE_API_URL')}/pokemon/${name}`,
    );

    const pokemon = {
      ...data,
      abilities: this.orderPokemonAbilities(data.abilities),
    };

    return PokemonDataMapper.output(pokemon);
  }

  private orderPokemonAbilities(abilities: Ability[]) {
    return abilities.sort((a, b) =>
      a.ability.name.localeCompare(b.ability.name),
    );
  }
}
