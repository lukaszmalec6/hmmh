<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex flex-column mb-5">
                <v-checkbox v-model="positionFront" label="Przód" class="pl-2"></v-checkbox>
                <v-checkbox v-model="positionBack" label="Tył" class="pl-2"></v-checkbox>
                <v-btn @click="submitClick()" :disabled="!positionFront && !positionBack" small color="primary"
                    class="align-self-center">
                    Dalej
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    name: 'PicturePositionSelector',
    data: () => ({
        positionFront: true,
        positionBack: false,
    }),
    watch: {
        positionFront: function () {
            this.emitValues();
        },
        positionBack: function () {
            this.emitValues();
        }
    },
    methods: {
        submitClick() {
            this.$emit('submitClick')
        },
        emitValues() {
            this.$emit('valueChanges',
                {
                    positionFront: this.positionFront,
                    positionBack: this.positionBack,
                }
            )
        }
    }

}
</script>

<style>
</style>
