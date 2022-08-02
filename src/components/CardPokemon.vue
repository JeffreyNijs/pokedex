<script setup lang="ts">
import PokemonType from "@/components/PokemonType.vue";
import zeroPad from "@/utils/ZeroPad";
import { defineProps } from "vue";

defineProps({
  poke: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <v-card :href="`/pokemon/${poke.id}`" elevation="4" class="pa-3" min-width="270">
    <v-row no-gutters justify="center" align="center">
      <v-col cols=11>
        <v-row no-gutters>
          <v-col cols=3 xs=3 sm=2 align-self="center">
            <v-avatar width="100%" rounded="0">
              <div v-if="poke.sprites.front_default">
                <img class="avatar-pokemon" :src="poke.sprites.front_default" alt="" />
              </div>
            </v-avatar>
          </v-col>
          <v-col cols=5 xs=5 sm=5>
            <div class="text-capitalize font-weight-bold">{{ poke.name }}</div>
            <div><span class="text-gray font-weight-light">Nr. {{ zeroPad(poke.id, 3) }}</span></div>
          </v-col>
          <v-col cols=4 xs=4 sm=4>
            <div class="d-inline mr-1" v-for="(type, index) in poke.types" :key="index">
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