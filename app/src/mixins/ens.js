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
    async addressLookup(ensName) {
      const provider = new ethers.providers.CloudflareProvider();
      const address = await provider.resolveName(ensName);
      console.log(address);
      if (address) {
        return address;
      }
      return '';
    },
  },
};
