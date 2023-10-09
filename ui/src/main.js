import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

store.$axios = axios
Vue.use(VueAxios, axios);
Vue.use(VueApexCharts)

new Vue({
  router,
  store,
  vuetify,
  VueApexCharts,
  render: h => h(App)
}).$mount('#app')
