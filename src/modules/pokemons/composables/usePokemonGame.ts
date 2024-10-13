import { computed, h, onMounted, ref } from 'vue';
import { GameStatus } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import type { Pokemon, PokemonListResponse } from '../interfaces';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const isLoading = computed(() => pokemons.value.length === 0);
  const randomPokemon = computed(
    () => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)],
  );

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=150');

    const pokemons = response.data.results.map((pokemon) => {
      const id = pokemon.url.split('/').at(-2) ?? 0;

      return {
        id: +id,
        name: pokemon.name,
      };
    });
    return pokemons.sort(() => Math.random() - 0.5);
  };

  const getPokemonOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    const options = pokemons.value.slice(0, howMany);
    pokemonOptions.value = options;

    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
    } else gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getPokemonOptions();
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    getPokemonOptions,
    checkAnswer,
  };
};
