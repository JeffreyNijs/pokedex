<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
    type: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div :class="type" class="pkm-type">
        <span>{{ type }}</span>
    </div>
</template>

<style>
.pkm-type {
    font-size: .6em;
    font-weight: 400;
    width: 5.5em;
    text-align: center;
    display: inline-block;
    padding: 3px 10px;
    border-radius: 100px;
}

.pkm-type span {
    text-transform: uppercase;
    font-size: .8em;
    color: white;
    text-shadow: 0em 0em .2em black;
}
</style>