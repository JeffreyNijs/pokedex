<template>
  <v-app>
    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "App",
  data() {
    return {
      //
    };
  },
  watch: {
    $route(to, from) {
        document.title = to.meta.title || 'Loading...';
    },
}
})
</script>

<style>
@keyframes animate {
  from {
    background-color: #fff;
  }
}

.animated {
  animation: animate 1s;
}

.normal {
  background-color: #a8a878;
  border-top-color: lighten(#a8a878, 15%);
  border-bottom-color: darken(#a8a878, 15%);
}

.fire {
  background-color: #F08030;
  border-top-color: lighten(#F08030, 15%);
  border-bottom-color: darken(#F08030, 15%);
}

.fighting {
  background-color: #c03028;
  border-top-color: lighten(#c03028, 15%);
  border-bottom-color: darken(#c03028, 15%);
}

.water {
  background-color: #6890f0;
  border-top-color: lighten(#6890f0, 15%);
  border-bottom-color: darken(#6890f0, 15%);
}

.poison {
  background-color: #a040a0;
  border-top-color: lighten(#a040a0, 15%);
  border-bottom-color: darken(#a040a0, 15%);
}

.electric {
  background-color: #f8d030;
  border-top-color: lighten(#f8d030, 15%);
  border-bottom-color: darken(#f8d030, 15%);
}

.ground {
  background-color: #e0c068;
  border-top-color: lighten(#e0c068, 15%);
  border-bottom-color: darken(#e0c068, 15%);
}

.grass {
  background-color: #78c850;
  border-top-color: lighten(#78c850, 15%);
  border-bottom-color: darken(#78c850, 15%);
}

.flying {
  background-color: #a890f0;
  border-top-color: lighten(#a890f0, 15%);
  border-bottom-color: darken(#a890f0, 15%);
}

.ice {
  background-color: #98d8d8;
  border-top-color: lighten(#98d8d8, 15%);
  border-bottom-color: darken(#98d8d8, 15%);
}

.bug {
  background-color: #a8b820;
  border-top-color: lighten(#a8b820, 15%);
  border-bottom-color: darken(#a8b820, 15%);
}

.psychic {
  background-color: #f85888;
  border-top-color: lighten(#f85888, 15%);
  border-bottom-color: darken(#f85888, 15%);
}

.rock {
  background-color: #b8a038;
  border-top-color: lighten(#b8a038, 15%);
  border-bottom-color: darken(#b8a038, 15%);
}

.dragon {
  background-color: #7038f8;
  border-top-color: lighten(#7038f8, 15%);
  border-bottom-color: darken(#7038f8, 15%);
}

.ghost {
  background-color: #705898;
  border-top-color: lighten(#705898, 15%);
  border-bottom-color: darken(#705898, 15%);
}

.dark {
  background-color: #705848;
  border-top-color: lighten(#705848, 15%);
  border-bottom-color: darken(#705848, 15%);
}

.steel {
  background-color: #b8b8d0;
  border-top-color: lighten(#b8b8d0, 15%);
  border-bottom-color: darken(#b8b8d0, 15%);
}

.fairy {
  background-color: #ffb7fa;
  border-top-color: lighten(#ffb7fa, 15%);
  border-bottom-color: darken(#ffb7fa, 15%);
}
</style>