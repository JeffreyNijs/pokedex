<template>
  <v-container>
    <h1 class="my-3">Pokédex</h1>
    <v-text-field v-model="namePokemon" hide-details prepend-inner-icon="mdi-magnify" single-line variant="solo"
      clearable clear-icon="mdi-delete" density="compact" label="Pokémon zoeken" @click:prepend="toggleIdSearch"
      :prepend-icon="idSearch ? 'mdi-numeric' : 'mdi-alphabetical-variant'">
      <template v-slot:append v-if="!idSearch">
        <v-icon :icon="idSearch ? undefined : types.length ? 'mdi-filter' : 'mdi-filter-outline'"
          @click="toggleFilter" />
        <v-icon :icon="sortIcon" @click="toggleSort" />
      </template>
    </v-text-field>
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
    <PokemonList :poke="filterPokemonById"
      :header="`${filterPokemonById.length} ${filterPokemonById.length === 1 ? 'resultaat' : 'resultaten'}`"
      v-if="idSearch" />
    <PokemonList :poke="sortFilteredPokemon" :key="sort"
      :header="`${sortFilteredPokemon.length} ${sortFilteredPokemon.length === 1 ? 'resultaat' : 'resultaten'}`"
      v-else />
  </v-container>
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
      showSort: false,
      sort: 'numasc',
      idSearch: false,
      types: [],
    };
  },
  methods: {
    ...mapActions(["getPokemon"]),
    toggleFilter() {
      this.showFilters = !this.showFilters;
    },
    toggleIdSearch() {
      this.idSearch = !this.idSearch;
    },
    toggleSort() {
      if (this.sort === 'numasc') {
        this.sort = 'numdesc';
      } else if (this.sort === 'numdesc') {
        this.sort = 'alphaasc';
      } else if (this.sort === 'alphaasc') {
        this.sort = 'alphadesc';
      } else {
        this.sort = 'numasc';
      }
    },
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
    filterPokemonById() {
      if (!this.namePokemon) {
        return this.$store.state.pokemon;
      }
      return this.$store.state.pokemon.filter(pokemon => {
        return pokemon.id == this.namePokemon;
      });
    },
    sortIcon() {
      if (this.sort === 'numasc') {
        return 'mdi-sort-ascending';
      } else if (this.sort === 'numdesc') {
        return 'mdi-sort-descending';
      } else if (this.sort === 'alphaasc') {
        return 'mdi-sort-alphabetical-ascending';
      } else if (this.sort === 'alphadesc') {
        return 'mdi-sort-alphabetical-descending';
      }
      return 'mdi-sort-alphabetical-ascending';
    },
    sortFilteredPokemon() {
      const pokemon = this.filterPokemonByType;
      if (this.sort === 'numasc') {
        return pokemon.sort((a, b) => {
          return a.id - b.id;
        });
      } else if (this.sort === 'numdesc') {
        return pokemon.sort((a, b) => {
          return b.id - a.id;
        });
      } else if (this.sort === 'alphaasc') {
        return pokemon.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (this.sort === 'alphadesc') {
        return pokemon.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return pokemon;
    },
  },
  created() {
    this.getPokemon();
  },
}
</script>