<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img src="../assets/tshirt-blank.png" width="345" height="170">
          <v-row class="tshirt-overlay px-5">
            <v-col cols="6" class="d-flex justify-center align-center">
              <img v-if="formData.positionFront" src="https://picsum.photos/seed/piscum/50/"
                class="tshirt-pic-front"><img>

            </v-col>

            <v-col cols="6" class="d-flex justify-center align-center pl-6">
              <img v-if="formData.positionBack" src="https://picsum.photos/seed/piscum/50/"
                class="tshirt-pic-back"><img>

            </v-col>
          </v-row>

        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-stepper class="stepper" v-model="currentStep" vertical>

          <!-- step 1: position-->
          <v-stepper-step :complete="currentStep > 1" step="1">
            Wybór miejsca nadruku
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" class="d-flex flex-column mb-5">
                <v-checkbox v-model="formData.positionFront" label="Przód" class="pl-2"></v-checkbox>
                <v-checkbox v-model="formData.positionBack" label="Tył" class="pl-2"></v-checkbox>
                <v-btn @click="nextStep()" small color="primary" class="align-self-center">
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- step 2: img-->
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
      positionFront: true,
      positionBack: false,
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

.tshirt-overlay {
  height: 100%;
}

.tshirt-pic-front,
.tshirt-pic-back {
  position: absolute;
  top: 50px;
}
</style>