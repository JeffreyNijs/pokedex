<template>
    <v-container fluid pa-0>
        <v-row align="center" justify="center" style="height:100vh" dense>
            <v-col cols="12" lg="6" md="6" class="fill-height d-flex flex-column justify-center align-center">
                <v-progress-circular indeterminate />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "LoaderScreen",
};
</script>