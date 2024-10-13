<template>
  <section>
    <img v-if="showPokemon" class="fade-in h-[200px]" :src="pokemonImage" alt="PokemonImagen" />
    <img v-else class="brightness-0 h-[200px]" :src="pokemonImage" alt="PokemonImagen" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  pokemonId: Number,
  showPokemon: {
    type: Boolean,
    default: true,
  },
});

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style scoped>
img {
  pointer-events: none;
}
</style>
