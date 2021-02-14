import Vue from 'vue';
import Router from 'vue-router';

// import AuthGuard from '@/router/auth-guard';

import NotFound from '@/views/NotFound';
import Main from '@/views/Main';
import Asset from '@/views/Asset';
import Assets from '@/views/Assets';

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
    path: '/assets/:ethAddress',
    name: 'Assets',
    component: Assets,
    // beforeEnter: AuthGuard,
  },
  {
    path: '/asset/:contractAddress/:tokenId',
    name: 'Asset',
    component: Asset,
    // beforeEnter: AuthGuard,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
];

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,

});

export default router;
