<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { defineProps, ref } from "vue";
defineProps({
    theme: {
        type: String,
        required: false,
    },
});

const windowTop = ref(useWindowScroll().y);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
</script>

<template>
    <v-app-bar :color="windowTop ? '#FB1B1B' : '#00000000'" :elevation="windowTop ? undefined : 0"
        :theme="windowTop ? 'dark' : theme ?? 'light'" :collapse="windowTop > 0"
        :class="windowTop ? undefined : 'v-toolbar-events'">

        <v-spacer></v-spacer>

        <v-btn v-if="windowTop" icon @click="scrollToTop()">
            <v-icon>mdi-chevron-up</v-icon>
        </v-btn>

        <v-btn href="/" v-if="!windowTop" icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn href="/team" v-if="!windowTop" icon>
            <v-icon>mdi-pokeball</v-icon>
        </v-btn>

        <v-btn href="/favorites" v-if="!windowTop" icon>
            <v-icon>mdi-heart-multiple-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<style scoped>
.v-toolbar {
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -ms-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
    top: initial !important;
}

.v-toolbar-events {
    pointer-events: none;
}

.v-toolbar * {
    pointer-events: auto !important;
}
</style>