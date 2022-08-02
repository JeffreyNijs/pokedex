<script setup lang="ts">
import CardPokemon from "@/components/CardPokemon.vue";
import { defineProps } from "vue";

defineProps({
    poke: {
        type: Object,
        required: true,
    },
    header: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <v-container class="my-5 ma-0 pa-0">
        <h4 v-if="header" class="mb-3">{{ header }}</h4>
        <v-row>
            <v-col cols="12" sx="12" sm="6" md="4" lg="3" v-for="pokemon in poke" :key="pokemon.id">
                <CardPokemon :poke="pokemon" />
            </v-col>
        </v-row>
    </v-container>
</template>