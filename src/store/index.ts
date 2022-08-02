import { PokemonList } from '@/models/pokemonList'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import { defineStore } from 'pinia'

export const usePokemonStore = defineStore({
  id: 'appwise-be',
  state: () => ({
    pokemonList: useStorage('pokemon', [] as PokemonList[]),
    team: useStorage('team', [] as number[]),
    favorites: useStorage('favorites', [] as number[]),
  }),
  getters: {
    getPokemon(): any[] {
      return this.pokemonList
    },
    getTeam(): number[] {
      return this.team
    },
    getFavorites(): number[] {
      return this.favorites
    }
  },
  actions: {
    async fetchPokemon() {
      await axios.get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon').then(response => this.pokemonList = response.data);
    }
  },
})




