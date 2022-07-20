<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-img src="../assets/tshirt-blank.png" width="345" height="170">
          <v-row class="tshirt-overlay px-5">
            <v-col cols="6" class="d-flex justify-center align-center">
              <img v-if="positionFront" :src="getPicUrl()" class="tshirt-pic-front" />
            </v-col>
            <v-col cols="6" class="d-flex justify-center align-center pl-6">
              <img v-if="positionBack" :src="getPicUrl()" class="tshirt-pic-back" />
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <span>Aktualna cena:</span>
        <span class="font-weight-bold ml-1">{{ getPrice() }} u.</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-stepper class="stepper" v-model="currentStep" vertical>

          <!-- step 1-->
          <v-stepper-step :complete="currentStep > 1" step="1">
            Wybór miejsca nadruku
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" class="d-flex flex-column mb-5">
                <v-checkbox v-model="positionFront" label="Przód" class="pl-2"></v-checkbox>
                <v-checkbox v-model="positionBack" label="Tył" class="pl-2"></v-checkbox>
                <v-btn @click="nextStep()" small color="primary" class="align-self-center">
                  Dalej
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- step 2-->
          <v-stepper-step :complete="currentStep > 2" step="2">
            Wybór grafiki do nadruku
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-row>
              <v-col cols="4" class="d-flex flex-column justify-center align-center">
                <v-btn @click="prevPic()" class="mx-2" fab small outlined>
                  <v-icon>
                    mdi-arrow-left
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="d-flex flex-column">
                <img :src="getPicUrl()" class="pic-select-prev" />
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-center">
                <v-btn @click="nextPic()" class="mx-2" fab small outlined>
                  <v-icon>
                    mdi-arrow-right
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center mb-3">
                <v-btn @click="randomPic()" small outlined class="align-self-center">
                  Wylosuj zdjecie
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center mb-5">
                <v-btn @click="prevStep()" small outlined class="align-self-center mx-1">
                  Wstecz
                </v-btn>
                <v-btn @click="nextStep()" small color="primary" class="align-self-center mx-1">
                  Dalej
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- step 3-->
          <v-stepper-step :complete="currentStep > 3" step="3">
            Wybór efektów nadruku
          </v-stepper-step>
          <v-stepper-content step="3">
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
                <v-btn @click="prevStep()" small outlined class="align-self-center mx-1">
                  Wstecz
                </v-btn>
                <v-btn @click="nextStep()" small color="primary" class="align-self-center mx-1">
                  Dalej
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <!-- step 4 -->
          <v-stepper-step :complete="currentStep > 4" step="4">
            Dane zamawiającego
          </v-stepper-step>

          <v-stepper-content step="4">
            <ClientDataForm @submitClick="onClientDataFormSubmit" @backClick="prevStep" />
          </v-stepper-content>

          <!-- step 5 -->
          <v-stepper-step :complete="currentStep > 5" step="5">
            Podsumowanie
          </v-stepper-step>

          <v-stepper-content step="5">
            <v-row>
              <v-col cols="12">
                <h5>Pozycja nadruku:</h5>
                <span v-if="positionFront">przód</span>
                <span v-if="positionFront && positionBack"> i </span>
                <span v-if="positionBack">tył</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h5>Nadruk:</h5>
                <img :src="getPicUrl()" class="pic-select-prev" />
              </v-col>
            </v-row>
            <v-row v-if="formValue">
              <v-col cols="12">
                <v-row>
                  <v-col cols="12">
                    <h5>Dane zamawiającego:</h5>
                    <span>{{ formValue.clientFirstName }} {{ formValue.clientLastName }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h5>Dane do rachunku:</h5>
                    <div>
                      <span>ul. {{ formValue.streetName }} {{ formValue.buildingNumber }}</span>
                      <span v-if="formValue.flatNumber"> / {{ formValue.flatNumber }}</span>
                    </div>
                    <div>
                      <span>{{ formValue.cityCode }} {{ formValue.cityName }}</span>
                    </div>
                    <div>
                      <span>{{ formValue.email }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center mb-5">
                <v-btn @click="prevStep()" small outlined class="align-self-center mx-1">
                  Wstecz
                </v-btn>
                <v-btn @click="nextStep()" small color="primary" class="align-self-center mx-1">
                  Złóż zamówienie
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

        </v-stepper>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import ClientDataForm from './ClientDataForm';


export default {
  name: 'ShopWizard',
  components: { ClientDataForm },
  data: () => ({
    currentStep: 1,

    picId: 1000,
    picEffect: null,
    blurScale: 1,

    positionFront: true,
    positionBack: false,


    formValue: null
  }),


  methods: {
    getPicUrl() {
      if (this.picEffect) {
        const query = this.picEffect === 'blur' ? `=${this.blurScale}` : ''
        return `https://picsum.photos/id/${this.picId}/50/?${this.picEffect}${query}`
      }
      return `https://picsum.photos/id/${this.picId}/50/`
    },

    getPrice() {
      let price = 0;
      if (this.positionBack) {
        price = price + 10;
      }
      if (this.positionFront) {
        price = price + 10;
      }
      return price;
    },

    randomPic() {
      const randomId = Math.floor(Math.random() * (1025 - 1000) + 1000);
      if (randomId === this.picId) {
        this.picId = randomId + 1;
      } else {
        this.picId = randomId;
      }

    },

    nextPic() {
      this.picId = this.picId + 1;
    },

    prevPic() {
      this.picId = this.picId - 1;

    },

    nextStep() {
      this.currentStep = this.currentStep + 1;
    },

    prevStep() {
      this.currentStep = this.currentStep - 1;
    },


    onClientDataFormSubmit(value) {
      this.formValue = value;
      this.nextStep();
    }
  }

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