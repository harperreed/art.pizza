import axios from 'axios';

export default {
  data() {
    return {
      asset: undefined,
      nameAssets: undefined,
      contract: undefined,
      loadingAssets: false,
      openseaRequestConfig: {
        headers: {
          'X-API-KEY': import.meta.env.VITE_OPENSEA_APIKEY,
        },
      },
    };
  },
  mounted() {
    console.log(this.openseaRequestConfig);
  },
  methods: {
    async getAssets() {
      console.log('assets');
      console.log("Let's get the assets");
      const limit = 50;
      let offset = 0;

      // at some point we need to iterate through this - or use THEGRAPH
      let done = false;
      this.loadingAssets = true;
      let assets = [];
      while (!done) {
        const assetsUrl = `https://api.opensea.io/api/v1/assets?limit=${limit}&offset=${offset}&order_direction=desc&owner=${this.ethAddress}`;

        // eslint-disable-next-line no-await-in-loop
        const assetResponse = await axios.get(assetsUrl, this.openseaRequestConfig);
        const assetResponseData = assetResponse.data;
        if (assets === []) {
          assets = assetResponseData.assets;
        } else {
          assets = [...assets, ...assetResponseData.assets];
        }
        console.log(assetResponse.data);

        if (assetResponseData.assets.length === 0) {
          done = true;
        } else {
          console.log("let's get more");
          offset += limit;
        }
      }

      const newAssets = [];
      const ensAssets = [];
      assets.forEach((asset) => {
        console.log(asset.asset_contract);
        if (asset.asset_contract.symbol === 'ENS'
          || asset.asset_contract.name === '.crypto'
          || asset.asset_contract.symbol === 'NAME'
          || asset.asset_contract.name === 'DCL Registrar') {
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
      this.loadingAssets = false;
      return assets;
    },
    async getAsset(contractAddress, tokenId) {
      console.log(contractAddress, tokenId);
      const assetUrl = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}/`;

      // Make a request for a user with a given ID
      try {
        const response = await axios.get(assetUrl, this.openseaRequestConfig);

        return response.data; // response;
      } catch (error) {
        return {};
      }
    },
    async getExcitingAssets(assetList) {
      const limit = 50;
      const offset = 0;
      let assetParams = '';
      assetList.forEach((asset) => {
        assetParams = `${assetParams}&asset_contract_addresses=${asset.address}&token_ids=${asset.id}`;
      });

      const assetsUrl = `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${offset}&limit=${limit}&${assetParams}`;
      const assetsResponse = await axios.get(assetsUrl, this.openseaRequestConfig);
      return assetsResponse.data.assets;
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
        const assetsResponse = await axios.get(assetsUrl, this.openseaRequestConfig);
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
