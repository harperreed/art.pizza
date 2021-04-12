const ethers = require('ethers');

// const provider = new ethers.providers.CloudflareProvider();
const provider = new ethers.providers.InfuraProvider('homestead', {
  projectId: '926d09b2b9ce4354847fe9a485d19bfd',
});
export default {
  data() {
    return {
      ensName: '',
      ethBalance: '',
      ensData: {},
    };
  },
  watch: {

    async ethAddress(address) {
      if (!this.ensName) {
        this.ensName = await this.ensLookup(address);
      }
      this.ethBalance = await this.getBalance(address);
    },
    async ensName(name) {
      this.ensData = await this.getEnsData(name);
    },
  },

  methods: {
    isAddress(ethAddress) {
      return ethers.utils.isAddress(ethAddress);
    },
    async getBalance(ethAddress) {
      try {
        const balanceResponse = await provider.getBalance(ethAddress);
        const ethBalance = ethers.utils.formatEther(balanceResponse);

        return ethBalance;
      } catch (error) {
        console.log(error);
      }
      return 0;
    },
    async ensLookup(ethAddress) {
      console.log(ethAddress);
      try {
        const name = await provider.lookupAddress(ethAddress);
        return name;
      } catch (error) {
        console.warn(error);
      }
      return '';
    },
    async ensResolve(ensName) {
      console.log(ensName);
      try {
        const address = await provider.resolveName(ensName);
        console.log(address);
        return address;
      } catch (error) {
        console.log(error);
      }
      return '';
    },
    async getEnsData(ensName) {
      const records = ['avatar', 'email', 'url', 'vnd.twitter', 'vnd.github'];
      const data = {};
      try {
        const resolver = await provider.getResolver(ensName);

        if (resolver) {
          // eslint-disable-next-line no-restricted-syntax
          for (const key of records) {
            // eslint-disable-next-line no-await-in-loop
            const result = await resolver.getText(key);
            if (result) {
              data[key] = result;
            }
          }
          return data;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },

  },
};
