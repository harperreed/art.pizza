const axios = require('axios').default;

const assetsJson = require('@/assets.json');

export default {

  methods: {
    async getAssets() {
      const assetsUrl = `/api/assets/${this.ethAddress}`;
      try {
        const assetsResponse = await axios.get(assetsUrl);
        this.assets = assetsResponse.data;
      } catch (error) {
        this.assets = assetsJson.assets;
        console.log(error);
      }
    },
    async getAsset(contractAddress, tokenId) {
      const assetUrl = `/api/asset/${contractAddress}/${tokenId}`;
      console.log(assetUrl);
      try {
        const assetResponse = await axios.get(assetUrl);
        return assetResponse.data;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
};
