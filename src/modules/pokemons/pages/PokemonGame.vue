<template>
  <section v-if="isLoading || randomPokemon.id === null" class="container-section">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>

  <section v-else class="container-section">
    <h2 class="m-2">¿Quien es ese pokemon?</h2>
    <h3 class="text-xl" v-if="gameStatus !== GameStatus.Playing">
      Has {{ gameStatus === GameStatus.Won ? 'ganado!!' : 'perdido :(' }}
    </h3>

    <button
      class="bg-green-200 px-2 py-1 rounded-md my-1"
      v-if="gameStatus !== GameStatus.Playing"
      @click="getPokemonOptions()"
    >
      Jugar otra vez!
    </button>

    <!--Pokemon image -->
    <PokemonImage
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!--Pokemons options -->
    <PokemonOptions
      :options="options"
      :gameStatus="gameStatus"
      :random-pokemon="randomPokemon"
      @select-pokemon="onSelectedPokemon"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  randomPokemon,
  gameStatus,
  isLoading,
  pokemonOptions: options,
  checkAnswer,
  getPokemonOptions,
} = usePokemonGame();

const onSelectedPokemon = (id: number) => {
  checkAnswer(id);
};
</script>

<style scoped>
.container-section {
  @apply h-screen flex justify-center items-center flex-col;
}
</style>
