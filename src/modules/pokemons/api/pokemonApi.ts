const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

import axios from 'axios';

const pokemonApi = axios.create({
  baseURL: POKE_API_URL,
});

export { pokemonApi };
