const axios = require('axios').default;

export default {
  data() {
    return {
      asset: undefined,
      nameAssets: undefined,
    };
  },
  methods: {
    async getAssets() {
      const assetsUrl = `/api/assets/${this.ethAddress}`;
      try {
        const assetsResponse = await axios.get(assetsUrl);
        /* eslint guard-for-in: "error" */
        const newAssets = [];
        const ensAssets = [];
        assetsResponse.data.forEach((asset) => {
          console.log(asset.asset_contract);
          if (asset.asset_contract.symbol === 'ENS' || asset.asset_contract.name === '.crypto') {
            ensAssets.push(asset);
          } else {
            newAssets.push(asset);
          }
        });
        if (newAssets.length > 0) {
          this.assets = newAssets;
        }
        if (ensAssets.length > 0) {
          this.nameAssets = ensAssets;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getAsset(contractAddress, tokenId) {
      const assetUrl = `/api/asset/${contractAddress}/${tokenId}`;

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
