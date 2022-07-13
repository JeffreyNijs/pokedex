<template>
  <v-card :href="`/pokemon/${pokemon.id}`" elevation="4" class="pa-3 my-3">
    <v-row no-gutters>
      <v-col cols=11>
        <v-row no-gutters>
          <v-col cols=3 xs=3 sm=2 align-self="center">
            <v-avatar width="100%" rounded="0">
              <div v-if="pokemon.sprites">
                <img class="avatar-pokemon" :src="pokemon.sprites.front_default" alt="" />
              </div>
            </v-avatar>
          </v-col>
          <v-col cols=5 xs=5 sm=5>
            <div class="text-capitalize font-weight-bold">{{ pokemon.name }}</div>
            <div><span class="text-gray font-weight-light">Nr. {{ zeroPad() }}</span></div>
          </v-col>
          <v-col cols=4 xs=4 sm=4>
            <div class="d-inline mr-2" v-for="(type, index) in pokemon.types" :key="index">
              <PokemonType :type="type.type.name" />
            </div>
            <div></div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=1>
        <div class="justify-end chevron">
          <v-icon color="#BABEC2">mdi-chevron-right</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-card>
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