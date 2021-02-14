import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from '@/router';
import { store } from '@/store';

Vue.config.productionTip = true

Vue.use(Buefy)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
