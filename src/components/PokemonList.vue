<template>
    <v-container class="my-5">
        <CardPokemon v-for="pokemon in poke" :key="pokemon.id" :poke="pokemon" />
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