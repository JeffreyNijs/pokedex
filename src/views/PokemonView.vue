<!-- A page that loads in a specific pokemon from the API and displays it.
the api url is https://pokeapi.co/api/v2/pokemon/<pokemon_id> -->
<template>
    <v-container fill-height fluid background-color="primary">
    <div v-if="pokemon">
        <h1 class="text-capitalize">{{ pokemon.name }}</h1>
        <v-carousel :continuous="false" :cycle="cycle" :show-arrows="false" hide-delimiter-background
            delimiter-icon="mdi-minus" height="300">
            <v-carousel-item v-for="(sprite, i) in pokemon.sprites" :key="i">
                <v-sheet height="100%" tile>
                    <v-row class="fill-height" align="center" justify="center">
                        <v-img :src="sprite" v-if="typeof sprite === 'string'" />
                    </v-row>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <h2 class="text-capitalize">Info</h2>
        <v-card rounded elevation="5">
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Type
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <v-col v-for="(type, index) in pokemon.types" :key="index">
                        <PokemonType :type="type" />
                    </v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Nummer
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p>Nr. {{ zeroPad() }}</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Hoogte
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p>{{ pokemon.height / 10 }}m</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Gewicht
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p>{{ pokemon.weight / 10 }} kg</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Categorie
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p>{{ pokemon.category }} TODO</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Geslacht
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p>{{ pokemon.gender }} TODO</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <p class="font-weight-light">
                        Vaardigheden
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p class="text-capitalize">{{ pokemon.abilities[0].ability.name }} TODO</p>
                </v-col>
            </v-row>
        </v-card>
        <h2 class="text-capitalize">Statistieken</h2>
        <v-card rounded elevation="5">
            <v-row v-for="(stat) in pokemon.stats" :key="stat.stat.name">
                <v-col cols="12" md="4">
                    <p class="font-weight-light text-capitalize">
                        {{ stat.stat.name }}
                    </p>
                </v-col>
                <v-col cols="12" md="4">
                    <p class="font-weight-bold">
                        {{ stat.base_stat }}
                    </p>
                </v-col>
                <v-col cols="12" md="4">
                    <p class="font-weight-bold">
                        GRAPH TODO
                    </p>
                </v-col>
            </v-row>
        </v-card>
        <h2 class="text-capitalize">Moveset</h2>
        <v-card rounded elevation="5">
            <v-row v-for="(move) in pokemon.moves" :key="move.move.name">
                <v-col cols="12" md="6">
                    <p class="font-weight-light text-capitalize">
                        {{ move.move.name }}
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <p class="font-weight-bold">
                        {{ move.version_group_details[0].level_learned_at }}
                    </p>
                </v-col>
            </v-row>
        </v-card>
        </div>
        <div fill-height fluid v-else>
        <v-row align-center justify-center>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-row>
    </div>
    </v-container>
</template>

<script>
import PokemonType from "@/components/PokemonType.vue";
import zeroPad from "@/utils/ZeroPad";
import axios from "axios";
export default {
    name: "PokemonView",
    components: {
        PokemonType,
    },
    data() {
        return {
            pokemon: {},
            type: "",
            number: "",
        };
    },
    methods: {
        async getPokemon() {
            let id = this.$route.params.id;
            try {
                let details = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                console.log(details.data)
                this.pokemon = details.data;
            } catch (error) {
                console.log(error);
            } finally {
                console.log();
            }
        },
        zeroPad() {
            return zeroPad(this.pokemon.id, 3);
        }
    },
    created() {
        this.getPokemon();
    },
};
</script>

<style>
.avatar-pokemon {
    width: 100%;
}
</style>