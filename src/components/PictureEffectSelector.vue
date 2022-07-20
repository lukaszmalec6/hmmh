<template>
    <v-container>
        <v-row>
            <v-col cols="12 ml-3">
                <v-radio-group v-model="picEffect">
                    <v-radio label="Odcień szarości" value="grayscale"></v-radio>
                    <v-radio label="Rozmycie" value="blur"></v-radio>
                    <v-slider v-if="picEffect === 'blur'" v-model="blurScale" hint="Stopień rozmycia" max="10" min="1"
                        class="mt-2">
                    </v-slider>
                    <v-radio label="Żaden" :value="null"></v-radio>
                </v-radio-group>
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
    name: 'PictureEffectSelector',
    data: () => ({
        picEffect: null,
        blurScale: 1,
    }),

    watch: {
        picEffect: function () {
            this.emitValues();
        },
        blurScale: function () {
            this.emitValues();
        }
    },
    methods: {
        submitClick() {
            this.$emit('submitClick')
        },

        backClick() {
            this.$emit('backClick')
        },

        emitValues() {
            this.$emit('valueChanges', {
                picEffect: this.picEffect,
                blurScale: this.blurScale
            })
        }
    }

}
</script>

<style>
</style>
