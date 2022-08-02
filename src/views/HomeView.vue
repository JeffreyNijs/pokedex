<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import LoaderScreen from "@/components/LoaderScreen.vue";
import PokemonList from "@/components/PokemonList.vue";
import { usePokemonStore } from "@/store";
import { computed, ref } from "vue";

const store = usePokemonStore();

store.fetchPokemon();

const pokemonList = computed(() => {
  return store.pokemonList;
});
const namePokemon = ref('');
const showFilters = ref(false);
const sort = ref('numasc');
const idSearch = ref(false);
const types = ref([]);

const statePokemonFilteredByName = computed(() => {
  return pokemonList.value.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(namePokemon.value.toLowerCase());
  });
})

const availableTypesAndCount = computed(() => {
  return statePokemonFilteredByName.value.reduce((acc: { [key: string]: number }, pokemon) => {
    pokemon.types.forEach((type: { type: { name: string; }; }) => {
      if (!acc[type.type.name as keyof typeof acc]) {
        acc[type.type.name as keyof typeof acc] = 1;
      } else {
        acc[type.type.name as keyof typeof acc]++;
      }
    });
    types.value.forEach(type => {
      if (!acc[type as keyof typeof acc]) {
        acc[type as keyof typeof acc] = 0;
      }
    });
    return acc;
  }, {});
})

const filterPokemonByType = computed(() => {
  if (types.value.length === 0) {
    return statePokemonFilteredByName.value;
  }
  return statePokemonFilteredByName.value.filter(pokemon => {
    return pokemon.types.some((type: { type: { name: string; }; }) => {
      return types.value.includes(type.type.name as never);
    });
  });
})

const filterPokemonById = computed(() => {
  if (!namePokemon.value) {
    return pokemonList.value;
  }
  return pokemonList.value.filter(pokemon => {
    return pokemon.id.toString() === namePokemon.value;
  });
})

const sortIcon = computed(() => {
  if (sort.value === 'numasc') {
    return 'mdi-sort-ascending';
  } else if (sort.value === 'numdesc') {
    return 'mdi-sort-descending';
  } else if (sort.value === 'alphaasc') {
    return 'mdi-sort-alphabetical-ascending';
  } else if (sort.value === 'alphadesc') {
    return 'mdi-sort-alphabetical-descending';
  }
  return 'mdi-sort-alphabetical-ascending';
})

const sortFilteredPokemon = computed(() => {
  const pokemon = filterPokemonByType.value;
  if (sort.value === 'numasc') {
    return pokemon.sort((a, b) => {
      return a.id - b.id;
    });
  } else if (sort.value === 'numdesc') {
    return pokemon.sort((a, b) => {
      return b.id - a.id;
    });
  } else if (sort.value === 'alphaasc') {
    return pokemon.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  } else if (sort.value === 'alphadesc') {
    return pokemon.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }
  return pokemon;
})

const toggleFilter = () => {
  showFilters.value = !showFilters.value;
}

const toggleIdSearch = () => {
  idSearch.value = !idSearch.value;
}

const toggleSort = () => {
  if (sort.value === 'numasc') {
    sort.value = 'numdesc';
  } else if (sort.value === 'numdesc') {
    sort.value = 'alphaasc';
  } else if (sort.value === 'alphaasc') {
    sort.value = 'alphadesc';
  } else {
    sort.value = 'numasc';
  }
}
</script>

<template>
  <AppBar />
  <v-container v-if="pokemonList">
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
      <v-row v-show="showFilters" no-gutters>
        <v-col cols="12" md="2" sm="4" v-for="(value, propertyName) in availableTypesAndCount" :key="propertyName">
          <v-checkbox hide-details class="ma-0 pa-0 text-capitalize" v-model="types"
            :label="propertyName + ': ' + value" :value="propertyName">
          </v-checkbox>
        </v-col>
      </v-row>
    </v-expand-transition>
    <PokemonList :poke="idSearch ? filterPokemonById : sortFilteredPokemon.values()"
      :header="`${idSearch ? filterPokemonById.length : sortFilteredPokemon.length} ${(idSearch ? filterPokemonById.length : sortFilteredPokemon.length) === 1 ? 'resultaat' : 'resultaten'}`" />
  </v-container>
  <LoaderScreen v-else />
</template>

<style scoped>
.v-text-field {
  min-width: 270px;
}
</style>