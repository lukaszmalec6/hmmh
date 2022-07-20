<template>
  <v-app>
    <v-main>
      <v-container fill-height fluid>
        <ShopWizard />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ShopWizard from './components/ShopWizard';

export default {
  name: 'App',

  components: {
    ShopWizard,
  },


};
</script>

<style>
</style>