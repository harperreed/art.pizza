import Vue from 'vue';
import Router from 'vue-router';

import NotFound from '@/views/NotFound.vue';
import Main from '@/views/Main.vue';
import Asset from '@/views/Asset.vue';
import Contract from '@/views/Contract.vue';
import Assets from '@/views/Assets.vue';

Vue.use(Router);

const routes = [
  // {
  //   path: '/signin',
  //   name: 'signin',
  //   component: Signin,
  // },
  // {
  //   path: '/profile',
  //   name: 'show-profile',
  //   component: Profile,
  //   beforeEnter: AuthGuard,
  // },
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  {
    path: '/:ethRoute',
    name: 'Assets',
    component: Assets,
    // beforeEnter: AuthGuard,
  },
  {
    path: '/contract/:contractAddress/:tokenId',
    name: 'Asset',
    component: Asset,
    // beforeEnter: AuthGuard,
  },
  {
    path: '/contract/:contractAddress/',
    name: 'Contract',
    component: Contract,
    // beforeEnter: AuthGuard,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];

const router = new Router({

  mode: 'hash',
  routes,

});

export default router;
