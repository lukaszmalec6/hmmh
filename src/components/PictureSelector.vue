<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="d-flex flex-column justify-center align-center">
                <v-btn @click="prevPicClick()" class="mx-2" fab small outlined>
                    <v-icon>
                        mdi-arrow-left
                    </v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex flex-column">
                <img :src="picUrl" />
            </v-col>
            <v-col cols="4" class="d-flex justify-center align-center">
                <v-btn @click="nextPicClick()" class="mx-2" fab small outlined>
                    <v-icon>
                        mdi-arrow-right
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center align-center mb-3">
                <v-btn @click="randomPicClick()" small outlined class="align-self-center">
                    Wylosuj zdjecie
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center align-center mb-5">
                <v-btn @click="backClick()" small outlined class="align-self-center mx-1">
                    Wstecz
                </v-btn>
                <v-btn @click="submitClick()" small color="primary" class="align-self-center mx-1">
                    Dalej
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    name: 'PictureSelector',
    props: {
        picUrl: {
            type: String,
            default: ''
        },

    },

    methods: {
        randomPicClick() {
            this.$emit('randomPicClick')

        },
        nextPicClick() {
            this.$emit('nextPicClick')
        },
        prevPicClick() {
            this.$emit('prevPicClick')
        },

        submitClick() {
            this.$emit('submitClick')
        },

        backClick() {
            this.$emit('backClick')
        },
    }

}
</script>

<style>
</style>
