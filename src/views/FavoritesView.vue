<template>
    <AppBar :theme="'dark'" />
    <v-container fluid class="bg animated fill-height">
        <v-container>
            <h1>Favorieten</h1>
            <PokemonList :poke="filterPokemonByIdsInFavorites" />
        </v-container>
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
h1 {
    color: white;
}

.bg {
    background: linear-gradient(109.73deg, #65CB9A 0%, #15D0DC 100%);
}
</style>