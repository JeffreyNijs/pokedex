<template>
    <AppBar />
    <v-container fluid pa-0>
        <v-row align="center" justify="center" style="height:100vh" dense>
            <v-col cols="12" lg="6" md="6" class="fill-height d-flex flex-column justify-center align-center">
                <h1>404</h1>
                <caption>Page not found</caption>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
export default {
    name: "NotFoundView",
    components: {
        AppBar,
    },
};
</script>