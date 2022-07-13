<template>
    <v-container fill-height fluid :class="[pokemon.types[0].type.name, 'animated']">
        <div v-if="pokemon">
            <h1 class="text-capitalize">{{ pokemon.name }}</h1>
            <v-carousel hide-delimiters :continuous="false" :show-arrows="true" hide-delimiter-background
                delimiter-icon="mdi-minus" height="300">
                <v-carousel-item v-if="pokemon.sprites.other['official-artwork'].front_default">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other['official-artwork'].front_default" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.home.front_default">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.home.front_default" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.home.front_shiny">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.home.front_shiny" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.home.front_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.home.front_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.home.front_shiny_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.home.front_shiny_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.dream_world.front_default">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.dream_world.front_default" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.other.dream_world.front_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.other.dream_world.front_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.front_default">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.front_default" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.back_default">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.back_default" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.front_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.front_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.back_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.back_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.front_shiny">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.front_shiny" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.back_shiny">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.back_shiny" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.front_shiny_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.front_shiny_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item v-if="pokemon.sprites.back_shiny_female">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="pokemon.sprites.back_shiny_female" />
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <h4 class="text-capitalize">INFO</h4>
            <v-card class="pa-3 my-3" rounded elevation="5">
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Type
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <div class="d-inline" v-for="(type, index) in pokemon.types" :key="index">
                            <PokemonType :type="type.type.name" />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Nummer
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">{{ zeroPad() }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Hoogte
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">{{ pokemon.height / 10 }}m</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Gewicht
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">{{ pokemon.weight / 10 }} kg</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Categorie
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">{{ pokemon.category }} NOT IN API</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Geslacht
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">{{ pokemon.gender }} NOT IN API</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs12 md6>
                        <span class="font-weight-light">
                            Vaardigheden
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="text-capitalize">{{ divideAbilitiesByComma(pokemon.abilities) }}</span>
                    </v-col>
                </v-row>
            </v-card>
            <h4 class="text-capitalize">Statistieken</h4>
            <v-card class="pa-3 my-3" rounded elevation="5">
                <v-row v-for="(stat) in pokemon.stats" :key="stat.stat.name">
                    <v-col xs12 md6>
                        <span class="font-weight-light text-capitalize">
                            {{ stat.stat.name }}
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <span class="font-weight-bold">
                            {{ stat.base_stat }}
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <v-progress-linear :model-value="stat.base_stat" background-color="error" color="success">
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-card>
            <h4 class="text-capitalize">Moveset</h4>
            <v-card class="pa-3 my-3" rounded elevation="5">
                <v-row v-for="(move) in orderMovesByLevelLearnedAt(pokemon.moves)" :key="move.move.name">
                    <v-col xs12 md6>
                        <span class="font-weight-light text-capitalize">
                            {{ move.move.name }}
                        </span>
                    </v-col>
                    <v-col xs12 md6>
                        <v-chip class="short" variant="outlined" align-self="center">
                            <span>{{ move.version_group_details[0].level_learned_at }}</span>
                        </v-chip>
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
        },
        divideAbilitiesByComma(abilities) {
            return abilities.map((ability) => ability.ability.name).join(", ");
        },
        orderMovesByLevelLearnedAt(moves) {
            return moves.sort((a, b) => {
                return a.version_group_details[0].level_learned_at -
                    b.version_group_details[0].level_learned_at;
            });
        },
    },
    created() {
        this.getPokemon();
        this.$vuetify.theme.themes.light.primary = '#4caf50'
        this.$vuetify.theme.themes.dark.primary = '#4caf50'
    },
};
</script>

<style scoped>
.avatar-pokemon {
    width: 100%;
}

.v-sheet {
    background-color: rgb(255, 0, 0, 0);
}

/* all headers should be white */
h1,
h2,
h3,
h4,
h5 {
    color: white;
}

.short {
    width: 50px;
    justify-content: center;
}
</style>