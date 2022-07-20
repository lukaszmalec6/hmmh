import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import ShopWizard from './components/ShopWizard'

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { path: '/', component: ShopWizard },
  { path: '/thank-you', component: ShopWizard },

]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
