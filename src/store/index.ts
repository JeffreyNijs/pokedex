import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    pokemon: [],
    team: [] as number[],
    favorites: [] as number[],
  },
  getters: {
    getPokemon: state => state.pokemon,
    getTeam: state => state.team,
    getFavorites: state => state.favorites,
  },
  mutations: {
    SET_POKEMON(state, data) { state.pokemon = data; },
    ADD_TO_TEAM(state, data) { state.team.push(data); },
    REMOVE_FROM_TEAM(state, data) { state.team.splice(state.team.indexOf(data), 1); },
    ADD_TO_FAVORITES(state, data) { state.favorites.push(data); },
    REMOVE_FROM_FAVORITES(state, data) { state.favorites.splice(state.favorites.indexOf(data), 1); },
    CLEAR_TEAM(state) { state.team = []; },
    CLEAR_FAVORITES(state) { state.favorites = []; },
  },
  actions: {
    async fetchPokemon({ commit }) {
      await axios.get('https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon').then(response => commit("SET_POKEMON", response.data));
    },
    addToTeam({ commit }, data) { commit("ADD_TO_TEAM", data); },
    removeFromTeam({ commit }, data) { commit("REMOVE_FROM_TEAM", data); },
    addToFavorites({ commit }, data) { commit("ADD_TO_FAVORITES", data); },
    removeFromFavorites({ commit }, data) { commit("REMOVE_FROM_FAVORITES", data); },
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
