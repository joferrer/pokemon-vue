import { onMounted, ref } from 'vue';
import { GameStatus } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import type { PokemonListResponse } from '../interfaces';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=150');
    console.log(response.data);
  };

  onMounted(() => {
    getPokemons();
  });

  return {
    gameStatus,
  };
};
