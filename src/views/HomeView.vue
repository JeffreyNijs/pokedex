<template>
  <v-app class="indigo lighten-5">
    <v-container>
      <h1>Pokédex</h1>
      <v-text-field v-model="namePokemon" hide-details prepend-inner-icon="mdi-magnify" single-line
        label="Pokémon zoeken" />
      <PokemonList :poke="statePokemonFilteredByName" />
    </v-container>
  </v-app>
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    PokemonList,
  },
  data() {
    return {
      namePokemon: '',
    };
  },
  methods: {
    ...mapActions(["getPokemon"]),
  },
  computed: {
    ...mapState(["pokemon"]),
    statePokemonFilteredByName() {
      return this.$store.state.pokemon.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(this.namePokemon.toLowerCase());
      });
    },
  },
  created() {
    this.getPokemon();
  },
}
</script>