import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsService } from './pokemons.service';
import { pokemonMock } from '../../../test/pokemons.mock';
import { PokemonDataMapper } from './dto/pokemons.dto';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://pokeapi.co/api/v2'),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should fetch and return a pokemon with ordered abilities', async () => {
      const axiosResponse: AxiosResponse<Pokemon> = {
        data: pokemonMock,
        status: 200,
      } as AxiosResponse<Pokemon>;

      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValue(axiosResponse);

      const result = await service.findOne('bulbasaur');
      expect(result).toEqual(PokemonDataMapper.output(pokemonMock));
    });

    it('should handle errors when fetching a pokemon', async () => {
      jest.spyOn(httpService.axiosRef, 'get').mockImplementationOnce(() => {
        throw new Error('Network error');
      });

      await expect(service.findOne('unknown')).rejects.toThrow(Error);
    });
  });
});
