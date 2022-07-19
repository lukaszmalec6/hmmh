<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="clientFirstName" :rules="rules" label="Imię" class="required"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="clientLastName" :rules="rules" label="Nazwisko" class="required">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <h5>Dane do rachunku</h5>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="streetName" :rules="rules" label="Ulica" class="required"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="buildingNumber" :rules="rules" label="Nr budynku" class="required">
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="flatNumber" label="Nr mieszkania"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="cityName" :rules="rules" label="Miasto" class="required"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="cityCode" :rules="rules" label="Kod pocztowy" class="required">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="rules" label="Adres e-mail" class="required"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="d-flex justify-center align-center mb-5">
                    <v-btn @click="backClick()" small outlined class="align-self-center mx-1">
                        Wstecz
                    </v-btn>
                    <v-btn @click="submitClick()" :disabled="!valid" small color="primary"
                        class="align-self-center mx-1">
                        Dalej
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>


<script>
export default {
    name: 'ClientDataForm',

    data: () => ({
        valid: true,
        clientFirstName: '',
        clientLastName: '',
        streetName: '',
        buildingNumber: '',
        flatNumber: '',
        cityCode: '',
        cityName: '',
        email: '',
    }),

    computed: {
        rules() {
            const rules = []
            const rule =
                v => (v && v.trim() || '').length > 0 ||
                    `Pole jest wymagane`
            rules.push(rule)

            return rules
        },
    },


    methods: {
        backClick() {
            this.$emit('backClick')
        },

        submitClick() {
            this.$emit('submitClick',
                this.getFormValues()
            )
        },

        validateField() {
            this.$refs.form.validate()
        },

        getFormValues() {
            return {
                clientFirstName: this.clientFirstName,
                clientLastName: this.clientLastName,
                streetName: this.streetName,
                buildingNumber: this.buildingNumber,
                flatNumber: this.flatNumber,
                cityCode: this.cityCode,
                cityName: this.cityName,
                email: this.email
            }
        }
    }

}
</script>

<style>
.required label::after {
    content: "*";
    color: orangered;
    margin-left: 5px;
}
</style>