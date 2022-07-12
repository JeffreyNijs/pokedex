import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    pokemon: [],
  },
  getters: {
  },
  mutations: {
    SET_POKEMON(state, data) { state.pokemon = data; },
  },
  actions: {
    async getPokemon({ commit }) {
      await axios.get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon').then(response => commit("SET_POKEMON", response.data));
    }
  },
  modules: {
  }
})
