<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img src="../assets/tshirt-blank.png"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-stepper class="stepper" v-model="currentStep" vertical>

          <!-- step 1 -->
          <v-stepper-step :complete="currentStep > 1" step="1">
            Wybór miejsca nadruku
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card></v-card>
            <v-btn @click="nextStep()">
              Continue
            </v-btn>
          </v-stepper-content>

          <!-- step 2-->
          <v-stepper-step :complete="currentStep > 2" step="2">
            Wybór grafiki do nadruku
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card></v-card>
            <v-btn @click="nextStep()">
              Continue
            </v-btn>
            <v-btn @click="prevStep()">
              Cancel
            </v-btn>
          </v-stepper-content>

          <!-- step 3 -->
          <v-stepper-step :complete="currentStep > 3" step="3">
            Dane do wysyłki
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card></v-card>
            <v-btn @click="nextStep()">
              Continue
            </v-btn>
            <v-btn @click="prevStep()">
              Cancel
            </v-btn>
          </v-stepper-content>

        </v-stepper>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ShopWizzard',

  data: () => ({
    currentStep: 1,
    formData: {
    },

    nextStep() {
      this.currentStep = this.currentStep + 1;
    },

    prevStep() {
      this.currentStep = this.currentStep - 1;
    }

  }),
}
</script>

<style>
.stepper {
  box-shadow: none !important;
}
</style>