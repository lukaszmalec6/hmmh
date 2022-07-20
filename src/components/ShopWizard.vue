<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-img src="../assets/tshirt-blank.png">
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

          <v-stepper-step :complete="currentStep > 1" step="1">
            Wybór miejsca nadruku
          </v-stepper-step>
          <v-stepper-content step="1">
            <PicturePositionSelector @valueChanges="onPicturePositionSubmit" @submitClick="nextStep" />
          </v-stepper-content>

          <v-stepper-step :complete="currentStep > 2" step="2">
            Wybór grafiki do nadruku
          </v-stepper-step>
          <v-stepper-content step="2">
            <PictureSelector @submitClick="nextStep" @backClick="prevStep" @randomPicClick="randomPic"
              @nextPicClick="nextPic" @prevPicClick="prevPic" :picUrl="getPicUrl()" />
          </v-stepper-content>

          <v-stepper-step :complete="currentStep > 3" step="3">
            Wybór efektów nadruku
          </v-stepper-step>
          <v-stepper-content step="3">
            <PictureEffectSelector @valueChanges="onPictureEffectValueChanges" @submitClick="nextStep"
              @backClick="prevStep" />
          </v-stepper-content>

          <v-stepper-step :complete="currentStep > 4" step="4">
            Podsumowanie
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(1)" fab x-small :outlined="!summaryStatus[1]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(1)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <h5>Pozycja nadruku:</h5>
                <span v-if="positionFront">Przód</span>
                <span v-if="positionFront && positionBack"> i </span>
                <span v-if="positionBack">Tył</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(2)" fab x-small :outlined="!summaryStatus[2]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(2)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10-">
                <h5>Nadruk:</h5>
                <img :src="getPicUrl()" class="pic-select-prev" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(3)" fab x-small :outlined="!summaryStatus[3]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(3)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <h5>Efekt:</h5>
                <span v-if="picEffect === 'grayscale'">Odcień szarości</span>
                <span v-if="picEffect === 'blur'">Rozmycie</span>
                <span v-if="!picEffect">Żaden</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center my-3">
                <v-btn @click="nextStep()" :disabled="firstSummaryButtonDisabled()" small color="primary"
                  class="align-self-center">
                  Dalej
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>

          <v-stepper-step :complete="currentStep > 5" step="5">
            Dane zamawiającego
          </v-stepper-step>
          <v-stepper-content step="5">
            <ClientDataForm @submitClick="onClientDataFormSubmit" @backClick="prevStep" />
          </v-stepper-content>

          <v-stepper-step :complete="currentStep > 6" step="6">
            Wybór sposobu odbioru zamówienia
          </v-stepper-step>

          <v-stepper-content step="6">
            <v-row>
              <v-col cols="12 ml-3">
                <v-radio-group v-model="transport">
                  <v-radio label="Odbiór osobisty" value="pickup"></v-radio>
                  <v-radio label="Wysyłka" value="delivery"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row v-if="transport === 'delivery'">
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-btn @click="setDeliveryFormValue()" small outlined class="align-self-center mx-1">
                  Użyj danych rachunku
                </v-btn>
              </v-col>
              <v-col cols="12">
                <ClientDataForm :patchValues="deliveryFormValue" :fullForm="false"
                  @submitClick="onDeliveryDataFormSubmit" @backClick="prevStep" />
              </v-col>
            </v-row>
            <v-row v-if="transport !== 'delivery'">
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

          <v-stepper-step :complete="currentStep > 7" step="7">
            Podsumowanie zamówienia
          </v-stepper-step>
          <v-stepper-content step="7">
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(1)" fab x-small :outlined="!summaryStatus[1]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(1)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <h5>Pozycja nadruku:</h5>
                <span v-if="positionFront">Przód</span>
                <span v-if="positionFront && positionBack"> i </span>
                <span v-if="positionBack">Tył</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(2)" fab x-small :outlined="!summaryStatus[2]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(2)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10-">
                <h5>Nadruk:</h5>
                <img :src="getPicUrl()" class="pic-select-prev" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn @click="toggleCompleteStep(3)" fab x-small :outlined="!summaryStatus[3]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(3)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
                <h5>Efekt:</h5>
                <span v-if="picEffect === 'grayscale'">Odcień szarości</span>
                <span v-if="picEffect === 'blur'">Rozmycie</span>
                <span v-if="!picEffect">Żaden</span>
              </v-col>
            </v-row>
            <v-row v-if="formValue">
              <v-col cols="2" class="d-flex justify-center">
                <v-btn @click="toggleCompleteStep(5)" fab x-small :outlined="!summaryStatus[5]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(5)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="10">
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
              <v-col cols="2" class="d-flex justify-center ">
                <v-btn @click="toggleCompleteStep(6)" fab x-small :outlined="!summaryStatus[6]" color="success"
                  class="mx-1">
                  <v-icon>
                    mdi-check
                  </v-icon>
                </v-btn>
                <v-btn @click="goToStep(6)" fab x-small outlined class="mx-1">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols=" 10">
                <v-row>
                  <v-col cols="12">
                    <h5>Sposób odbioru zamówienia:</h5>
                    <span v-if="transport === 'delivery'">Dostawa</span>
                    <span v-if="transport === 'pickup'">Odbiór osobisty</span>
                  </v-col>
                </v-row>
                <v-row v-if="deliveryFormValue && transport === 'delivery'">
                  <v-col cols="12">
                    <h5>Dane do wysyłki:</h5>
                    <div>
                      <span>ul. {{ deliveryFormValue.streetName }} {{ deliveryFormValue.buildingNumber }}
                      </span>
                      <span v-if="deliveryFormValue.flatNumber"> / {{ deliveryFormValue.flatNumber }}</span>
                    </div>
                    <div>
                      <span>{{ deliveryFormValue.cityCode }} {{ deliveryFormValue.cityName }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center align-center my-3">
                <v-btn @click="confirmPurchase()" :disabled="secondSummaryButtonDisabled()" small color="accent"
                  class="align-self-center">
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
import PicturePositionSelector from './PicturePositionSelector';
import PictureSelector from './PictureSelector';
import PictureEffectSelector from './PictureEffectSelector';


export default {
  name: 'ShopWizard',
  components: { ClientDataForm, PicturePositionSelector, PictureSelector, PictureEffectSelector },
  data: () => ({
    currentStep: 1,

    picId: 1000,
    positionFront: true,
    positionBack: false,
    picEffect: null,
    blurScale: 1,

    transport: 'pickup',

    formValue: null,
    deliveryFormValue: null,

    summaryStatus: {
      1: false,
      2: false,
      3: false,
      5: false,
      6: false
    }
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

      if (this.picEffect === 'blur') {
        price = price + 3;
      }

      if (this.picEffect === 'grayscale') {
        price = price + 2;
      }

      if (this.transport === 'delivery') {
        price = price + 5;
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

    goToStep(step) {
      this.currentStep = step;
      this.summaryStatus[step] = false;
    },

    toggleCompleteStep(step) {
      this.summaryStatus[step] = !this.summaryStatus[step];
    },

    onPicturePositionSubmit(value) {
      this.positionFront = value.positionFront;
      this.positionBack = value.positionBack;
    },

    onClientDataFormSubmit(value) {
      this.formValue = value;
      this.nextStep();
    },

    onPictureEffectValueChanges(value) {
      this.picEffect = value.picEffect;
      this.blurScale = value.blurScale;
    },

    onDeliveryDataFormSubmit(value) {
      this.deliveryFormValue = value;
      this.nextStep();
    },

    setDeliveryFormValue() {
      this.deliveryFormValue = {
        streetName: this.formValue.streetName,
        buildingNumber: this.formValue.buildingNumber,
        flatNumber: this.formValue.flatNumber,
        cityCode: this.formValue.cityCode,
        cityName: this.formValue.cityName,
      }
    },

    firstSummaryButtonDisabled() {
      return !this.summaryStatus[1] || !this.summaryStatus[2] || !this.summaryStatus[3]
    },

    secondSummaryButtonDisabled() {
      return this.firstSummaryButtonDisabled() || !this.summaryStatus[5] || !this.summaryStatus[6]
    },

    confirmPurchase() {
      alert('confirm purchase')
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