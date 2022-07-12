<template>
    <v-badge class="white" :content="type.type.name" :color="color" inline />
</template>

<script>
export default {
    props: { type: Object },
    name: "PokemonType",
    data() {
        return {
            color: "",
        };
    },
    methods: {
        async getColor() {
            switch (this.type.type.name) {
                case "normal":
                    this.color = "grey";
                    break;
                case "fire":
                    this.color = "deep-orange";
                    break;
                case "water":
                    this.color = "blue";
                    break;
                case "grass":
                    this.color = "green";
                    break;
                case "electric":
                    this.color = "amber";
                    break;
                case "ice":
                    this.color = "cyan lighten-3";
                    break;
                case "fighting":
                    this.color = "red darken-4";
                    break;
                case "poison":
                    this.color = "deep-purple darken-1";
                    break;
                case "ground":
                    this.color = "lime darken-4";
                    break;
                case "flying":
                    this.color = "teal lighten-3";
                    break;
                case "psychic":
                    this.color = "purple accent-3";
                    break;
                case "bug":
                    this.color = "lime darken-2";
                    break;
                case "rock":
                    this.color = "brown darken-2";
                    break;
                case "ghost":
                    this.color = "indigo lighten-2";
                    break;
                case "dragon":
                    this.color = "indigo darken-4";
                    break;
                case "dark":
                    this.color = "blue-grey darken-4";
                    break;
                case "steel":
                    this.color = "blue-grey lighten-1";
                    break;
                case "fairy":
                    this.color = "pink lighten-3";
                    break;
                default:
                    break;
            }
        },
    },
    created() {
        this.getColor();
    },
};
</script>

<style scoped>
.main-card {
    background-size: 80%;
    background-position: center;
    position: relative;
}
</style>