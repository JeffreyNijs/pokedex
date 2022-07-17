<template>
    <AppBar :theme="'dark'" />
    <v-container v-if="team" fluid class="bg animated fill-height">
        <v-container>
            <h1>Mijn team</h1>
            <PokemonList :poke="filterPokemonByIdsInTeam" />
        </v-container>
    </v-container>
    <LoaderScreen v-else />
</template>

<script>
import PokemonList from "@/components/PokemonList.vue";
import AppBar from "@/components/AppBar.vue";
import { mapState, mapActions } from "vuex";
import LoaderScreen from "@/components/LoaderScreen.vue";
export default {
    components: {
        PokemonList,
        AppBar,
        LoaderScreen,
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