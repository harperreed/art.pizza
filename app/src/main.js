import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = true

Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
