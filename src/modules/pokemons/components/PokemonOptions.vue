<template>
  <section class="flex flex-col">
    <button
      v-for="{ id, name } in options"
      :key="id"
      @click="$emit('selectPokemon', id)"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-400 disabled:hover:shadow-none',
        {
          correct: gameStatus !== GameStatus.Playing && id === randomPokemon?.id,
          incorrect: gameStatus !== GameStatus.Playing && id !== randomPokemon?.id,
        },
      ]"
      :disabled="gameStatus !== GameStatus.Playing"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { GameStatus, type Pokemon } from '../interfaces';

defineProps({
  options: { type: Array<Pokemon>, required: true },
  gameStatus: { type: String, required: true },
  randomPokemon: { type: Object },
});

defineEmits(['selectPokemon']);
</script>

<style scoped>
button {
  @apply py-2 px-5 rounded-md bg-white mt-2 shadow-sm hover:shadow-md;
}
.correct {
  @apply bg-green-500 text-white;
}

.incorrect {
  @apply bg-red-500 text-white;
}
</style>
