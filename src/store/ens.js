/* eslint-disable no-restricted-syntax */
const ethers = require('ethers');

// const provider = new ethers.providers.CloudflareProvider();
const provider = new ethers.providers.InfuraProvider('homestead', {
  projectId: '443ec86ea6ae445ea1499a403e14e899',
});

export default {
  state: {
    ensName: '',
    ensData: {},
  },
  mutations: {
    updateENSName: (state, data) => {
      state.ensName = data;
    },
    updateENSData: (state, data) => {
      state.ensData = data;
    },
  },
  actions: {
    async getENSName({ commit }, { ethAddress }) {
      console.log(ethAddress);
      const name = await provider.lookupAddress(ethAddress);

      await commit('updateENSName', name);
    },

    async getENSData({ commit }, { ensName }) {
      const records = [
        'avatar',
        'email',
        'url',
        'vnd.twitter',
        'vnd.github',
        'description',
      ];
      const data = {};
      try {
        const resolver = await provider.getResolver(ensName);

        if (resolver) {
          for (const key of records) {
            // eslint-disable-next-line no-await-in-loop
            const result = await resolver.getText(key);
            if (result) {
              data[key] = result;
            }
          }
          await commit('updateENSData', data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    ensName(state) {
      return state.ensName;
    },
    ensData(state) {
      return state.ensData;
    },
  },

};
