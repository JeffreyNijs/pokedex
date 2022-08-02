<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import PokemonList from "@/components/PokemonList.vue";
import { usePokemonStore } from "@/store/index";
import { computed } from "vue";

const store = usePokemonStore();

await store.fetchPokemon();

const filterPokemonByIdsInFavorites = computed(() => {
    return store.favorites.map(id => {
        return store.pokemonList.find(p => p.id === id);
    });
});
</script>

<template>
    <AppBar :theme="'dark'" />
    <v-container fluid class="bg animated fill-height">
        <v-container>
            <h1>Favorieten</h1>
            <PokemonList :poke="filterPokemonByIdsInFavorites" />
        </v-container>
    </v-container>
</template>

<style scoped>
h1 {
    color: white;
}

.bg {
    background: linear-gradient(109.73deg, #65CB9A 0%, #15D0DC 100%);
}
</style>