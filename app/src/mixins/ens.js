import { ethers } from 'ethers';

export default {

  methods: {
    async ensLookup(ethAddress) {
      const provider = new ethers.providers.CloudflareProvider();
      const name = await provider.lookupAddress(ethAddress);
      console.log(name);
      if (name) {
        return name;
      }
      return ethAddress;
    },
  },
};