<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import CardPokemon from "@/components/CardPokemon.vue";
import PokemonType from "@/components/PokemonType.vue";
import RadarChart from "@/components/RadarChart.vue";
import { PokemonDetails } from "@/models/pokemonDetails";
import { Chain } from "@/models/pokemonEvolutions";
import { PokemonList } from "@/models/pokemonList";
import { PokemonSpecies } from "@/models/pokemonSpecies";
import { usePokemonStore } from "@/store/index";
import zeroPad from "@/utils/ZeroPad";
import { computed } from "@vue/reactivity";
import axios, { AxiosResponse } from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = usePokemonStore();

const pokemon = ref({} as PokemonDetails);
const species = ref({} as PokemonSpecies);
const evolution = ref([] as PokemonList[]);
const lightbox = ref("");
const statDetails = ref(true);


const fetchPokemonDetails = async () => {
    await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${route.params.id}`
    ).then((response) => {
        pokemon.value = response.data;
        document.title = `Pokédex - ` + pokemon.value.name.replace(/(^|[\s-])\S/g, (match: string) => { return match.toUpperCase(); });
        fetchPokemonSpecies();
    }).catch((error) => {
        console.log(error);
        router.push({ name: '404' });
    });
}

const fetchPokemonSpecies = async () => {
    await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.value.id}`).then((response) => {
        species.value = response.data;
        fetchPokemonEvolutionChain();
    }).catch((error) => { console.log(error); });
}

const fetchPokemonEvolutionChain = async () => {
    let evolutions = await axios.get(species.value.evolution_chain.url).then((response) => {
        let evolutions: Chain[] = [];
        let evolutionChain = response.data.chain;
        while (evolutionChain.evolves_to.length > 0) {
            evolutions.push(evolutionChain);
            evolutionChain = evolutionChain.evolves_to[0];
        }
        evolutions.push(evolutionChain);
        return evolutions;
    }).catch((error) => { console.log(error); });

    let evolutionArray = [];
    if (evolutions) {
        for (const evo of evolutions) {
            let evolution = await axios.get(evo.species.url).then((response: AxiosResponse<PokemonSpecies>) => {
                return response.data;
            }).catch((error) => { console.log(error); });
            if (evolution) {
                evolutionArray.push(await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${evolution.id}`
                ).then((response) => {
                    return store.pokemonList.filter((pokemon: PokemonList) => pokemon.id === response.data.id)[0];
                }).catch((error) => { console.log(error); }));
            }
        }
    }
    let evolutionList: PokemonList[] = evolutionArray.filter(pokemon => pokemon && store.pokemonList.filter((poke) => poke.id === pokemon.id).length > 0) as PokemonList[] ?? []
    evolution.value = evolutionList.length > 1 ? evolutionList : [];
}

const divideAbilitiesByComma = (abilities: any[]) => {
    return abilities.map((ability: { ability: { name: any; }; }) => ability.ability.name).join(", ");
}

const orderMovesByLevelLearnedAt = (moves: any[]) => {
    return moves.filter((move: { version_group_details: { level_learned_at: number; }[]; }) => move.version_group_details[0].level_learned_at > 0).sort((a: { version_group_details: { level_learned_at: number; }[]; }, b: { version_group_details: { level_learned_at: number; }[]; }) => {
        return a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at;
    });
}

const colorByLevel = (level: number) => {
    let color1 = 'DD0000';
    let color2 = '00CC00';
    let ratio = level / 100;
    let hex = function (x: string | number | any[]) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };
    let r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
    let g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
    let b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
    return `#${hex(r) + hex(g) + hex(b)}`;
}

const addToTeam = () => {
    store.team.push(pokemon.value.id);
}

const removeFromTeam = () => {
    store.team = store.team.filter((poke: number) => poke !== pokemon.value.id);
}

const addToFavorites = () => {
    store.favorites.push(pokemon.value.id);
}

const removeFromFavorites = () => {
    store.favorites = store.favorites.filter((poke: number) => poke !== pokemon.value.id);
}

const openLightbox = (image: string) => {
    lightbox.value = image;
}

if (isNaN(Number.parseInt(route.params.id as string))) {
    await store.fetchPokemon();
}
await fetchPokemonDetails();

const isInTeam = computed(() => {
    return store.team.filter((poke: number) => poke === pokemon.value.id).length > 0;
});

const isInFavorites = computed(() => {
    return store.favorites.filter((poke: number) => poke === pokemon.value.id).length > 0;
});

const pokemonGenus = computed(() => {
    return species.value.genera.filter((genus: { language: { name: string; }; }) => genus.language.name === "en")[0].genus;
});

const pokemonFlavorText = computed(() => {
    return species.value.flavor_text_entries.filter((flavor: { language: { name: string; }; }) => flavor.language.name === "en")[0].flavor_text;
});

const carouselImages = computed(() => {
    if (pokemon.value.sprites) {
        return [
            pokemon.value.sprites.other['official-artwork'].front_default,
            pokemon.value.sprites.other.home.front_default,
            pokemon.value.sprites.other.home.front_shiny,
            pokemon.value.sprites.other.home.front_female,
            pokemon.value.sprites.other.home.front_shiny_female,
            pokemon.value.sprites.other.dream_world.front_default,
            pokemon.value.sprites.other.dream_world.front_female,
            pokemon.value.sprites.front_default,
            pokemon.value.sprites.back_default,
            pokemon.value.sprites.front_female,
            pokemon.value.sprites.back_female,
            pokemon.value.sprites.front_shiny,
            pokemon.value.sprites.back_shiny,
            pokemon.value.sprites.front_shiny_female,
            pokemon.value.sprites.back_shiny_female,
        ].filter((sprite) => sprite);
    }
    return [];
});

const radarChartData = computed(() => {
    return {
        labels: pokemon.value.stats.map((stat) => stat.stat.name.replace(/(^|[\s-])\S/g, (match) => { return match.toUpperCase(); })),
        datasets: [
            {
                label: "Base Stats",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: pokemon.value.stats.map((stat: { base_stat: number; }) => stat.base_stat),
            }
        ]
    }
})
</script>

<template>
    <AppBar :theme="'dark'" />
    <v-container fluid :class="[pokemon.types[0].type.name, 'animated', 'fill-height']">
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
                <v-btn color="transparent" elevation="0" icon :disabled="!isInTeam && store.team.length >= 6"
                    @click="isInTeam ? removeFromTeam() : store.team.length >= 6 ? undefined : addToTeam()">
                    <v-icon
                        :color="!isInTeam && store.team.length! > 6 || store.team.length >= 6 && !isInTeam ? '#AAAAAA' : 'white'">
                        {{ isInTeam ? 'mdi-account-multiple' : store.team.length >= 6 ? 'mdi-account-off-outline'
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
                        <span class="font-weight-bold">{{ zeroPad(pokemon.id, 3) }}</span>
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
                <RadarChart :chart-data="radarChartData" />
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
            <h5 v-if="evolution.length">Evolution</h5>
            <v-container :class="pokemon.id !== poke.id ? 'transparent' : undefined" class="my-5 ma-0 pa-0"
                v-for="poke in evolution" :key="poke.id">
                <CardPokemon :poke="poke" />
            </v-container>
            <v-overlay :model-value="lightbox.length > 0" @click="lightbox = ''" width="100vw"
                class="align-center justify-center">
                <v-container>
                    <v-img :src="lightbox" :key="lightbox.length" class="img" />
                </v-container>
            </v-overlay>
        </div>
        <div fill-height fluid v-else>
            <v-row align-center justify-center>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
        </div>
    </v-container>
</template>

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