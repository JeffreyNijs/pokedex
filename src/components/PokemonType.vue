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
    font-size: 15px;

    font-family: 'Trebuchet MS';
    font-weight: bold;
    width: 6em;
    text-align: center;
    display: inline-block;
    border: .1em solid transparent;
    padding: .1em .2em .2em;
    margin: .1em .015em;
    border-radius: .4em;
}

.pkm-type span {
    text-transform: uppercase;
    font-size: .8em;
    color: white;
    text-shadow: 0em 0em .2em black;
}
</style>