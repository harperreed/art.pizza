import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import { vuexfireMutations } from 'vuexfire';

import shared from '@/store/shared';
import profiles from '@/store/profiles';
import users from '@/store/users';
import nfts from '@/store/nfts';

Vue.use(Vuex);

const ls = new SecureLS({ isCompression: false });
const persistentConfig = {
  key: 'fake-money-art',
  paths: ['users'],
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
};

const vuexLocal = createPersistedState(persistentConfig);


export const store = new Vuex.Store({
  plugins: [vuexLocal],
  mutations: {
    ...vuexfireMutations,
  },
  modules: {
    profiles,
    shared,
    users,
    nfts,
  },
});
