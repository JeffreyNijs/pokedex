<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" sm="12" v-for="pokemon in poke" :key="pokemon.id">
                <CardPokemon :poke="pokemon" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardPokemon from "@/components/CardPokemon.vue";
export default {
    props: { poke: Array },
    name: "PokemonList",
    components: {
        CardPokemon,
    },
};
</script>


<style>
</style>