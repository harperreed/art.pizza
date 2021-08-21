import Vue from 'vue';

import titleMixin from '@/mixins/title';

import router from '@/router';
import { store } from '@/store';

import VueMasonry from 'vue-masonry-css';
import { VuePlausible } from 'vue-plausible';
import Moment from 'vue-moment';
import App from './App.vue';
import './index.css';

Vue.use(VuePlausible);

Vue.use(Moment);

Vue.use(VueMasonry);
Vue.mixin(titleMixin);

Vue.config.productionTip = false;
Vue.$plausible.enableAutoPageviews();

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
