<template>
    <div :class="type" class="pkm-type">
        <span>{{ type }}</span>
    </div>
</template>

<script>
export default {
    props: { type: String },
    name: "PokemonType",
};
</script>

<style>
.pkm-type {
    font-size: 12px;
    font-weight: 400;
    width: 56px;
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