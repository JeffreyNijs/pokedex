<template>
    <AppBar :theme="'dark'" />
    <v-container fluid :class="[pokemon.types[0].type.name, 'animated', 'fill-height']">
        <div class="container" v-if="pokemon">
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
            <v-row class="pa-3 justify-end">
                <v-btn color="transparent" elevation="0" icon
                    @click="isInFavorites ? removeFromFavorites() : addToFavorites()">
                    <v-icon :color="isInFavorites ? 'red' : 'white'">
                        {{ isInFavorites ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                </v-btn>
                <v-btn color="transparent" elevation="0" icon @click="isInTeam ? removeFromTeam() : addToTeam()">
                    <v-icon color="white">
                        {{ isInTeam ? 'mdi-account-multiple' : 'mdi-account-multiple-plus-outline' }}
                    </v-icon>
                </v-btn>
            </v-row>
            <h5>INFO</h5>
            <v-card class="pa-3 mb-10 mt-2" rounded elevation="5">
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Type
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <div class="d-inline mr-2" v-for="(type, index) in pokemon.types" :key="index">
                            <PokemonType :type="type.type.name" />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Nummer
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ zeroPad() }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Hoogte
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ pokemon.height / 10 }}m</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Gewicht
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ pokemon.weight / 10 }} kg</span>
                    </v-col>
                </v-row>
                <!-- <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Categorie
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ pokemon.category }} NOT IN API</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Geslacht
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ pokemon.gender }} NOT IN API</span>
                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Vaardigheden
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold text-capitalize">{{
                                divideAbilitiesByComma(pokemon.abilities)
                        }}</span>
                    </v-col>
                </v-row>
            </v-card>
            <h5>Statistieken</h5>
            <v-card class="pa-3 mb-10 mt-2" rounded elevation="5">
                <v-row v-for="(stat) in pokemon.stats" :key="stat.stat.name">
                    <v-col cols="4" xs="4" sm="4" md="4">
                        <span class="statName text-capitalize">
                            {{ stat.stat.name }}
                        </span>
                    </v-col>
                    <v-col cols=2 xs=2 sm=2 md=2>
                        <span class="font-weight-bold">
                            {{ stat.base_stat }}
                        </span>
                    </v-col>
                    <v-col cols=6 xs=6 sm=6 md=6>
                        <v-progress-linear :model-value="stat.base_stat" background-color="error" color="success">
                        </v-progress-linear>
                    </v-col>
                </v-row>
            </v-card>
            <h5>Moveset</h5>
            <v-card class="pa-3 mb-10 mt-2" rounded elevation="5">
                <v-row>
                    <v-col cols="12" sx="6" sm="6" md="6" v-for="(move) in orderMovesByLevelLearnedAt(pokemon.moves)"
                        :key="move.move.name">
                        <v-chip class="short mr-3" :color="colorByLevel(move.version_group_details[0].level_learned_at)"
                            variant="flat" align-self="center">
                            <span>{{ move.version_group_details[0].level_learned_at }}</span>
                        </v-chip>
                        <span class="font-weight-bold text-capitalize">
                            {{ move.move.name }}
                        </span>
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
import AppBar from "@/components/AppBar.vue";
import zeroPad from "@/utils/ZeroPad";
import axios from "axios";
import { mapActions } from "vuex";
export default {
    name: "PokemonView",
    components: {
        PokemonType,
        AppBar,
    },
    data() {
        return {
            pokemon: {},
            type: "",
            number: "",
        };
    },
    methods: {
        ...mapActions(["fetchPokemon", "addToTeam", "removeFromTeam", "addToFavorites", "removeFromFavorites"]),
        async fetchPokemonDetails() {
            let id = this.$route.params.id;
            try {
                let details = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                this.pokemon = details.data;
            } catch (error) {
                console.log(error);
            }
        },
        zeroPad() {
            return zeroPad(this.pokemon.id, 3);
        },
        divideAbilitiesByComma(abilities) {
            return abilities.map((ability) => ability.ability.name).join(", ");
        },
        orderMovesByLevelLearnedAt(moves) {
            return moves.filter((move) => move.version_group_details[0].level_learned_at > 0).sort((a, b) => {
                return a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at;
            });
        },
        colorByLevel(level) {
            let color1 = 'DD0000';
            let color2 = '00CC00';
            let ratio = level / 100;
            let hex = function (x) {
                x = x.toString(16);
                return (x.length == 1) ? '0' + x : x;
            };
            let r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
            let g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
            let b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
            return `#${hex(r) + hex(g) + hex(b)}`;
        },
        addToTeam() {
            this.$store.dispatch("addToTeam", this.pokemon.id);
        },
        removeFromTeam() {
            this.$store.dispatch("removeFromTeam", this.pokemon.id);
        },
        addToFavorites() {
            this.$store.commit("ADD_TO_FAVORITES", this.pokemon.id);
        },
        removeFromFavorites() {
            this.$store.commit("REMOVE_FROM_FAVORITES", this.pokemon.id);
        },
    },
    computed: {
        isInTeam() {
            return this.$store.state.team.includes(this.pokemon.id);
        },
        isInFavorites() {
            return this.$store.state.favorites.includes(this.pokemon.id);
        },
    },
    created() {
        if (isNaN(this.$route.params.id)) {
            this.fetchPokemon();
            this.pokemon = this.$store.state.pokemon.find((pokemon) => pokemon.id == this.$route.params.id);
        }
        this.fetchPokemonDetails();
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

h1,
h2,
h3,
h4,
h5 {
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.short {
    width: 50px;
    justify-content: center;
}

.statName {
    color: #ACB2C1;
}

.container {
    max-width: 500px;
    min-width: 250px;
    margin: 0 auto;
}
</style>