<template>
    <v-row class="thank-you-page-container">
        <v-col cols="auto">
            <v-dialog v-model="openDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar color="primary" dark>
                        <v-btn icon dark @click="closeDialog()">
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <h4> Wróć do sklepu</h4>
                    </v-toolbar>
                    <v-list v-if="summary" three-line subheader>
                        <v-subheader>Dziękujemy za zamówienie!</v-subheader>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Kupiłeś koszulkę z nadrukiem</v-list-item-title>
                                <v-list-item-subtitle>Pozycja nadruku:
                                    <span v-if="summary.positionFront">Przód</span>
                                    <span v-if="summary.positionFront && summary.positionBack"> i </span>
                                    <span v-if="summary.positionBack">Tył</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>Efekty na nadruku:
                                    <span v-if="summary.picEffect === 'grayscale'">Odcień szarości</span>
                                    <span v-if="summary.picEffect === 'blur'">Rozmycie</span>
                                    <span v-if="!summary.picEffect">Żaden</span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>Dane zamawiającego</v-list-item-title>
                                <v-list-item-subtitle><span>{{ summary.clientFirstName }} {{
                                        summary.clientLastName
                                }}
                                    </span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>ul. {{ summary.streetName }} {{ summary.buildingNumber }}</span>
                                    <span v-if="summary.flatNumber"> / {{ summary.flatNumber }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>{{ summary.cityCode }} {{ summary.cityName }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>{{ summary.email }}</span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-if="summary.deliveryAddress">
                            <v-list-item-content>
                                <v-list-item-title>Sposób odbioru zamówienia:</v-list-item-title>
                                <v-list-item-subtitle>
                                    <span v-if="summary.transport === 'delivery'">Dostawa na:</span>
                                    <span v-if="summary.transport === 'pickup'">Odbiór osobisty</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle v-if="summary.transport === 'delivery'">
                                    <span>
                                        ul. {{ summary.deliveryAddress.streetName }} {{
                                                summary.deliveryAddress.buildingNumber
                                        }}
                                    </span>
                                    <span v-if="summary.deliveryAddress.flatNumber">
                                        / {{ summary.deliveryAddress.flatNumber }}
                                    </span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <span>{{ summary.deliveryAddress.cityCode }} {{ summary.deliveryAddress.cityName
                                    }}</span>

                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>


<script>
export default {
    name: 'ThankYouPage',
    props: {
        dialog: {
            default: false
        },
        summaryData: {
            type: Object,
            default: () => ({})
        }
    },

    data: () => ({
        openDialog: false,
        summary: null,
    }),

    watch: {
        dialog: function (newVal) {
            this.openDialog = newVal;
        },
        summaryData: function (newVal) {
            if (!newVal) {
                return;
            }
            this.summary = newVal;
        }
    },

    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        }
    }

}
</script>

<style>
</style>