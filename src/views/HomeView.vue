<template>
  <v-app class="indigo lighten-5">
    <v-container>
      <h1>Pokédex</h1>
      <v-row class="d-flex" align="center" justify="center">
        <v-text-field v-model="namePokemon" hide-details prepend-inner-icon="mdi-magnify" single-line
          label="Pokémon zoeken" />
        <v-btn @click="showFilters = !showFilters" icon="mdi-filter" x-large color="primary"> </v-btn>
      </v-row>
      <v-expand-transition>
        <!-- {{ types }}
          {{ availableTypesAndCount }} -->
        <v-row v-show="showFilters" no-gutters>
          <v-col cols="12" md="2" sm="4" v-for="(value, propertyName) in availableTypesAndCount" :key="propertyName">
            <v-checkbox hide-details class="ma-0 pa-0 text-capitalize" v-model="types"
              :label="propertyName + ': ' + value" :value="propertyName">
            </v-checkbox>
          </v-col>
        </v-row>
      </v-expand-transition>
      <PokemonList :poke="filterPokemonByType" />
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
      showFilters: false,
      types: [],
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
    availableTypesAndCount() {
      return this.statePokemonFilteredByName.reduce((acc, pokemon) => {
        pokemon.types.forEach(type => {
          if (!acc[type.type.name]) {
            acc[type.type.name] = 1;
          } else {
            acc[type.type.name]++;
          }
        });
        this.types.forEach(type => {
          if (!acc[type]) {
            acc[type] = 0;
          }
        });
        return acc;
      }, {});
    },
    filterPokemonByType() {
      if (this.types.length === 0) {
        return this.statePokemonFilteredByName;
      }
      return this.statePokemonFilteredByName.filter(pokemon => {
        return pokemon.types.some(type => {
          return this.types.includes(type.type.name);
        });
      });
    },
  },
  created() {
    this.getPokemon();
  },
}
</script>