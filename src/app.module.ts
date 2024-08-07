import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonsModule } from './modules/pokemons/pokemons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PokemonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
