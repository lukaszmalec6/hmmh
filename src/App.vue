<template>
  <v-app>


    <v-main>
      <ShopStepper />
    </v-main>
  </v-app>
</template>

<script>
import ShopStepper from './components/ShopStepper';

export default {
  name: 'App',

  components: {
    ShopStepper,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.col {
  padding: 0 !important;
}
</style>