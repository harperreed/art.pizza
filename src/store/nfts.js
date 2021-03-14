export default {
  state: {
    assets: [],
  },
  mutations: {
    updateAssets: (state, data) => {
      state.assets = data;
    },
  },
  actions: {
    async getAssets({ commit }, { owner }) {
      console.log("Let's get the assets");
      let done = false;
      const limit = 50;
      let offset = 0;
      let assets = [];
      while (!done) {
        const assetsUrl = `https://api.opensea.io/api/v1/assets?limit=${limit}&offset=${offset}&order_direction=desc&owner=${owner}`;
        // eslint-disable-next-line no-await-in-loop
        const assetResponse = await this.$axios.$get(assetsUrl);
        assets = [...assets, ...assetResponse.assets];

        if (assetResponse.assets.length === 0) {
          done = true;
          console.log('done');
        } else {
          offset += limit;
        }
      }
      await commit('updateAssets', assets);
    },

    async getAsset(context, { token }) {
      try {
        const assetUrl = `https://api.opensea.io/api/v1/asset/${token.contract.id}/${token.tokenID}/`;
        const assetResponse = await this.$axios.$get(assetUrl);
        return assetResponse;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    },
  },
  getters: {
    assets(state) {
      return state.assets;
    },
  },

};
