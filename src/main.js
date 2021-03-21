import Vue from 'vue';

import titleMixin from '@/mixins/title';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import router from '@/router';
import { store } from '@/store';

import VueMasonry from 'vue-masonry-css';
import { VuePlausible } from 'vue-plausible';
import Moment from 'vue-moment';
import App from './App.vue';

Vue.use(VuePlausible);

Vue.use(Moment);

Vue.use(VueMasonry);
Vue.mixin(titleMixin);

Vue.config.productionTip = false;
Vue.$plausible.enableAutoPageviews();

Vue.use(Buefy);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
