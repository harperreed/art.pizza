const axios = require('axios').default;

export default {
  data() {
    return {
      asset: undefined,
      nameAssets: undefined,
      contract: undefined,
    };
  },
  methods: {
    async getAssets() {
      console.log('assets');
      console.log("Let's get the assets");
      const limit = 50;
      const offset = 0;
      let assets = [];

      // at some point we need to iterate through this - or use THEGRAPH
      const assetsUrl = `https://api.opensea.io/api/v1/assets?limit=${limit}&offset=${offset}&order_direction=desc&owner=${this.ethAddress}`;
      // eslint-disable-next-line no-await-in-loop
      const assetResponse = await axios.get(assetsUrl);

      assets = [...assetResponse.data.assets];

      const newAssets = [];
      const ensAssets = [];
      assets.forEach((asset) => {
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

      return assets;
    },
    async getAsset(contractAddress, tokenId) {
      console.log(contractAddress, tokenId);
      const assetUrl = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;

      // Make a request for a user with a given ID
      try {
        const response = await axios.get(assetUrl);

        return response.data; // response;
      } catch (error) {
        return {};
      }
    },
    async getContract(contractAddress) {
      console.log(contractAddress);
      const contractUrl = `https://api.opensea.io/api/v1/asset_contract/${contractAddress}/`;

      // Make a request for a user with a given ID
      try {
        const contractResponse = await axios.get(contractUrl);
        const limit = 50;
        const offset = 0;
        const assetsUrl = `https://api.opensea.io/api/v1/assets?limit=${limit}&offset=${offset}&order_direction=desc&asset_contract_address=${contractAddress}`;
        // eslint-disable-next-line no-await-in-loop
        const assetsResponse = await axios.get(assetsUrl);
        console.log(assetsResponse.data);

        const contract = contractResponse.data;
        contract.assets = assetsResponse.data.assets; // response;
        console.log(contract);
        return contract;
      } catch (error) {
        return {};
      }
    },
  },
};
