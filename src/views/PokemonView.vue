<template>
    <AppBar :theme="'dark'" />
    <v-container v-if="pokemon" fluid :class="[pokemon.types[0].type.name, 'animated', 'fill-height']">
        <div class="container" v-if="pokemon">
            <h1 class="text-capitalize">{{ pokemon.name }}</h1>
            <v-carousel hide-delimiters :continuous="false" :show-arrows="true" hide-delimiter-background
                delimiter-icon="mdi-minus" height="300">
                <v-carousel-item v-for="image in carouselImages" :key="image">
                    <v-sheet height="100%" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="image" v-on:click="openLightbox(image)" />
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
                <v-btn color="transparent" elevation="0" icon :disabled="!isInTeam && $store.state.team.length >= 6"
                    @click="isInTeam ? removeFromTeam() : $store.state.team.length >= 6 ? undefined : addToTeam()">
                    <v-icon
                        :color="!isInTeam && !$store.state.team.length >= 6 || $store.state.team.length >= 6 && !isInTeam ? '#AAAAAA' : 'white'">
                        {{ isInTeam ? 'mdi-account-multiple' : $store.state.team.length >= 6 ? 'mdi-account-off-outline'
                                : 'mdi-account-multiple-plus-outline'
                        }}
                    </v-icon>
                </v-btn>
            </v-row>
            <h5>INFO</h5>
            <v-card class="pa-3 mb-10 mt-2" rounded elevation="5">
                <v-row :v-if="pokemonFlavorText">
                    <v-col>
                        <p class="font-weight-medium">{{ pokemonFlavorText }}</p>
                    </v-col>
                </v-row>
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
                <v-row :v-if="pokemonGenus">
                    <v-col xs=12 md=6>
                        <span class="statName">
                            Categorie
                        </span>
                    </v-col>
                    <v-col xs=12 md=6>
                        <span class="font-weight-bold">{{ pokemonGenus }}</span>
                    </v-col>
                </v-row>
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
            <v-card v-if="statDetails" class="pa-3 mb-10 mt-2" rounded elevation="5" @click="statDetails = false">
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
                        <v-progress-linear class="d-inline-block" :model-value="stat.base_stat" background-color="error"
                            color="success" />
                    </v-col>
                </v-row>
            </v-card>
            <v-card v-else class="pa-3 mb-10 mt-2" rounded elevation="5" @click="statDetails = true">
                <RadarChart :chart-data="this.radarChartData" />
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
                        <span class="d-inline-block font-weight-bold text-capitalize">
                            {{ move.move.name }}
                        </span>
                    </v-col>
                </v-row>
            </v-card>
            <h5 v-if="this.evolution.length">Evolution</h5>
            <v-container :class="pokemon.id !== poke.id ? 'transparent' : undefined" class="my-5 ma-0 pa-0"
                v-for="poke in evolution" :key="poke.id">
                <CardPokemon :poke="poke" />
            </v-container>
            <v-overlay :model-value="lightbox.length > 0" @click="lightbox = ''" width="100vw"
                class="align-center justify-center">
                <v-container>
                    <v-img :src="lightbox" :key="lightbox.length" :cover="contain" class="img" />
                </v-container>
            </v-overlay>
        </div>
        <div fill-height fluid v-else>
            <v-row align-center justify-center>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
        </div>
    </v-container>
    <LoaderScreen v-else />
</template>

<script>
import PokemonType from "@/components/PokemonType.vue";
import AppBar from "@/components/AppBar.vue";
import zeroPad from "@/utils/ZeroPad";
import CardPokemon from "@/components/CardPokemon.vue";
import axios from "axios";
import { mapActions } from "vuex";
import RadarChart from "@/components/RadarChart.vue";
import LoaderScreen from "@/components/LoaderScreen.vue";
export default {
    name: "PokemonView",
    components: {
        PokemonType,
        AppBar,
        CardPokemon,
        RadarChart,
        LoaderScreen,
    },
    data() {
        return {
            pokemon: {},
            species: {},
            evolution: [],
            type: "",
            number: "",
            lightbox: '',
            statDetails: true,
        };
    },
    methods: {
        ...mapActions(["fetchPokemon", "addToTeam", "removeFromTeam", "addToFavorites", "removeFromFavorites"]),
        async fetchPokemonDetails() {
            await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`
            ).then((response) => {
                this.pokemon = response.data;
                document.title = `Pokédex - ` + this.pokemon.name.replace(/(^|[\s-])\S/g, (match) => { return match.toUpperCase(); });
                this.fetchPokemonSpecies();
            }).catch((error) => {
                console.log(error);
                this.$router.push({ name: '404' });
            });
        },
        async fetchPokemonSpecies() {
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`).then((response) => {
                this.species = response.data;
                this.fetchPokemonEvolutionChain();
            }).catch((error) => { console.log(error); });
        },
        async fetchPokemonEvolutionChain() {
            let evolutions = await axios.get(this.species.evolution_chain.url).then((response) => {
                let evolutions = [];
                let evolutionChain = response.data.chain;
                while (evolutionChain.evolves_to.length > 0) {
                    evolutions.push(evolutionChain);
                    evolutionChain = evolutionChain.evolves_to[0];
                }
                evolutions.push(evolutionChain);
                return evolutions;
            }).catch((error) => { console.log(error); });

            let evolutionArray = [];
            for (let evo of evolutions) {
                let evolution = await axios.get(evo.species.url).then((response) => {
                    return response.data;
                }).catch((error) => { console.log(error); });
                evolutionArray.push(await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${evolution.id}`
                ).then((response) => {
                    return this.$store.state.pokemon.filter(pokemon => pokemon.id === response.data.id)[0];
                }).catch((error) => { console.log(error); }));
            }
            let evolutionList = evolutionArray.filter(pokemon => this.$store.state.pokemon.filter(p => p.id === pokemon.id).length > 0)
            this.evolution = evolutionList.length > 1 ? evolutionList : [];
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
        openLightbox(image) {
            this.lightbox = image;
        },
    },
    computed: {
        isInTeam() {
            return this.$store.state.team.includes(this.pokemon.id);
        },
        isInFavorites() {
            return this.$store.state.favorites.includes(this.pokemon.id);
        },
        pokemonGenus() {
            if (this.species.genera) {
                return this.species.genera.find((genus) => genus.language.name === "en").genus;
            }
            return undefined;
        },
        pokemonFlavorText() {
            if (this.species.flavor_text_entries) {
                return this.species.flavor_text_entries.find((flavorText) => flavorText.language.name === "en").flavor_text.replace(/\f/g, ' ');
            }
            return undefined;
        },
        pokemonEvolutions() {
            if (this.evolution > 1) {
                return this.evolution;
            }
            return undefined;
        },
        carouselImages() {
            if (this.pokemon.sprites) {
                return [
                    this.pokemon.sprites.other['official-artwork'].front_default,
                    this.pokemon.sprites.other.home.front_default,
                    this.pokemon.sprites.other.home.front_shiny,
                    this.pokemon.sprites.other.home.front_female,
                    this.pokemon.sprites.other.home.front_shiny_female,
                    this.pokemon.sprites.other.dream_world.front_default,
                    this.pokemon.sprites.other.dream_world.front_female,
                    this.pokemon.sprites.front_default,
                    this.pokemon.sprites.back_default,
                    this.pokemon.sprites.front_female,
                    this.pokemon.sprites.back_female,
                    this.pokemon.sprites.front_shiny,
                    this.pokemon.sprites.back_shiny,
                    this.pokemon.sprites.front_shiny_female,
                    this.pokemon.sprites.back_shiny_female,
                ].filter((sprite) => sprite);
            }
            return [];
        },
        radarChartData() {
            return {
                labels: this.pokemon.stats.map((stat) => stat.stat.name.replace(/(^|[\s-])\S/g, (match) => { return match.toUpperCase(); })),
                datasets: [
                    {
                        label: "Base Stats",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 2,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: this.pokemon.stats.map((stat) => stat.base_stat),
                    }
                ]
            }
        },
    },
    created() {
        if (isNaN(this.$route.params.id)) {
            this.fetchPokemon();
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

.transparent {
    opacity: 0.4;
}

.img {
    height: 100vh;
}
</style>