<template>
  <v-btn :href="'/pokemon/' + pokemon.id" class="mx-0 px-0" rounded height="100%" width="100%">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar size="100%" width="100%" rounded="0">
            <div v-if="pokemon.sprites">
              <img class="avatar-pokemon" :src="pokemon.sprites.front_default" alt="" />
            </div>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="4" align-self="center">
          <v-row no-gutters dense>
            <p class="font-weight-bold text-capitalize">
              {{ poke.name }}
            </p>
          </v-row>
          <v-row no-gutters dense>
            <p class="font-weight-light">
              Nr. {{ zeroPad() }}
            </p>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" align-self="center">
          <div class="d-inline" v-for="(type, index) in pokemon.types" :key="index">
            <PokemonType :type="type.type.name" />
          </div>
          <v-spacer />
        </v-col>
        <v-col align-self="center" cols="12" md="2">
          <div class="d-flex justify-end">
            <v-icon>mdi-arrow-right</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-btn>
</template>

<script>
import PokemonType from "@/components/PokemonType.vue";
import zeroPad from "@/utils/ZeroPad";
export default {
  props: { poke: Object },
  name: "CardPokemon",
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
      this.pokemon = this.poke;
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

<style scoped>
.main-card {
  background-size: 80%;
  background-position: center;
  position: relative;
}

.sprites {
  position: absolute;
  width: 100%;
  bottom: -3.5em;
}

.avatar-pokemon {
  width: 100%;
}
</style>