import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from './app.module';
import { PokemonsModule } from './modules/pokemons/pokemons.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
    }).compile();
  });

  it('should be defined', () => {
    const appModule = module.get<AppModule>(AppModule);
    expect(appModule).toBeDefined();
  });

  it('should have PokemonsModule imported', () => {
    const pokemonsModule = module.get<PokemonsModule>(PokemonsModule);
    expect(pokemonsModule).toBeDefined();
  });
});
