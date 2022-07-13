<template>
  <v-card :href="`/pokemon/${pokemon.id}`" elevation="4" class="pa-3 my-3">
    <v-row no-gutters>
      <v-col xs12 md6 align-self="center">
        <v-avatar width="100%" rounded="0">
          <div v-if="pokemon.sprites">
            <img class="avatar-pokemon" :src="pokemon.sprites.front_default" alt="" />
          </div>
        </v-avatar>
      </v-col>
      <v-col xs6 sm4 md2>
        <div class="text-capitalize">{{ pokemon.name }}</div>
        <div>Nr. {{ zeroPad() }}</div>
      </v-col>
      <v-col xs6 sm4 md2>
        <div>
          <div class="d-inline" v-for="(type, index) in pokemon.types" :key="index">
            <PokemonType :type="type.type.name" />
          </div>
        </div>
        <div></div>
      </v-col>
      <v-col xs2 sm4 md2>
        <div class="d-flex justify-end">
          <v-icon>mdi-arrow-right</v-icon>
        </div>
        <div></div>
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