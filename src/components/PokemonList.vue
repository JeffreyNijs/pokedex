<template>
    <v-container class="my-5">
        <h4 v-if="header" class="mb-3">{{ header }}</h4>
        <v-row>
            <v-col cols="12" sx="12" sm="6" v-for="pokemon in poke" :key="pokemon.id">
                <CardPokemon :poke="pokemon" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardPokemon from "@/components/CardPokemon.vue";
export default {
    props: {
        poke: Array,
        header: {
            type: String,
            required: false,
        },
    },
    name: "PokemonList",
    components: {
        CardPokemon,
    },
};
</script>


<style>
</style>