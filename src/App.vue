<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid>
        <ShopStepper />
      </v-container>
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
</style>