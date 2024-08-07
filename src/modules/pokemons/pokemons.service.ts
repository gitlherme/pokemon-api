import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const { data } = await this.httpService.axiosRef.get<Pokemon>(
        `${this.configService.get<string>('BASE_API_URL')}/pokemon/${name}`,
      );

      const pokemon = {
        ...data,
        abilities: this.orderPokemonAbilities(data.abilities),
      };

      return PokemonDataMapper.output(pokemon);
    } catch (error) {
      if (error.response.status === 404) {
        throw new NotFoundException('Pokemon not found');
      }

      throw new InternalServerErrorException();
    }
  }

  private orderPokemonAbilities(abilities: Ability[]) {
    return abilities.sort((a, b) =>
      a.ability.name.localeCompare(b.ability.name),
    );
  }
}
