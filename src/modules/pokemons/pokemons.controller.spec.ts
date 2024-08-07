import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonDataMapper } from './dto/pokemons.dto';
import { pokemonMock } from '../../../test/pokemons.mock';

describe('PokemonsController', () => {
  let iot: PokemonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      controllers: [PokemonsController],
      providers: [
        PokemonsService,
        {
          provide: ConfigModule,
          useValue: { get: jest.fn().mockReturnValue('https://example.com') },
        },
      ],
    }).compile();

    iot = module.get<PokemonsController>(PokemonsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service with data transformation', async () => {
    jest
      .spyOn(PokemonsService.prototype, 'findOne')
      .mockResolvedValueOnce(PokemonDataMapper.output(pokemonMock));
    await iot.findOne({ name: 'Pikachu' });
    expect(PokemonsService.prototype.findOne).toHaveBeenCalledWith(
      'Pikachu'.toLowerCase(),
    );
  });
});
