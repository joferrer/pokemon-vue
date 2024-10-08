<template>
  <section v-if="false" class="container-section">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokemons</h3>
  </section>

  <section class="container-section">
    <h2 class="m-2">¿Quien es ese pokemon?</h2>
    <!--Pokemon image -->
    <PokemonImage />
    <!--Pokemons options -->
    <PokemonOptions />
  </section>
</template>

<script setup>
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
</script>

<style scoped>
.container-section {
  @apply h-screen flex justify-center items-center flex-col;
}
</style>
