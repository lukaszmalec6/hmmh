<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex flex-column mb-5">
                <v-checkbox v-model="positionFront" label="Przód" class="pl-2"></v-checkbox>
                <v-checkbox v-model="positionBack" label="Tył" class="pl-2"></v-checkbox>
                <v-btn @click="submitClick()" :disabled="!positionFront && !positionFront" small color="primary"
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

    methods: {


        submitClick() {
            this.$emit('submitClick',
                this.getValue()
            )
        },
        getValue() {
            return {
                positionFront: this.positionFront,
                positionBack: this.positionBack,
            }
        }
    }

}
</script>

<style>
</style>
