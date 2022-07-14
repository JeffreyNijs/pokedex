<template>
    <AppBar :theme="'dark'" />
    <v-container style="height: 100vh;" :style="{ background: 'linear-gradient(109.73deg, #65CB9A 0%, #15D0DC 100%)' }" fill-height fluid
        class='animated'>
        <h1 class="text-capitalize">Favorieten</h1>
        <PokemonList :poke="filterPokemonByIdsInFavorites" />
    </v-container>
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";
import AppBar from "@/components/AppBar.vue";
import { mapState, mapActions } from "vuex";
export default {
    components: {
        PokemonList,
        AppBar,
    },
    methods: {
        ...mapActions(["fetchPokemon"]),
    },
    computed: {
        ...mapState(["favorites"]),
        filterPokemonByIdsInFavorites() {
            return this.$store.state.favorites.map(id => {
                return this.$store.state.pokemon.find(p => p.id === id);
            });
        },
    },
    created() {
        this.fetchPokemon();
    },
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5 {
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
}
</style>