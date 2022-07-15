<template>
    <AppBar :theme="'dark'" />
    <v-container fluid class="bg animated fill-height">
        <v-container>
            <h1>Mijn team</h1>
            <PokemonList :poke="filterPokemonByIdsInTeam" />
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
        ...mapState(["team"]),
        filterPokemonByIdsInTeam() {
            return this.$store.state.team.map(id => {
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
    background: linear-gradient(109.73deg, #46469C 0%, #7E32E0 100%);
}
</style>