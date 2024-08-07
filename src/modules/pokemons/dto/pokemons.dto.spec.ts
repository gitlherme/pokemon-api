import { PokemonDataMapper, IPokemonDataMapperOutput } from './pokemons.dto';
import { Pokemon } from '../entities/pokemon.entity';
import { pokemonMock } from '../../../../test/pokemons.mock';

describe('PokemonOutput', () => {
  it('should correctly transform a Pokemon entity into IPokemonOutput', () => {
    const pokemon: Pokemon = pokemonMock;

    const expectedOutput: IPokemonDataMapperOutput = {
      id: pokemonMock.id,
      name: pokemonMock.name,
      abilities: pokemon.abilities,
      sprite: pokemonMock.sprites.front_default,
      types: pokemonMock.types,
    };

    const result = PokemonDataMapper.output(pokemon);
    expect(result).toEqual(expectedOutput);
  });
});
