const axios = require('axios').default;

export default {
  data() {
    return {
      ensName: '',
      ethAddress: '',
      ensData: {},
    };
  },
  watch: {
    async ethAddress(address) {
      if (!this.ensName) {
        this.ensName = await this.ensLookup(address);
      }
    },
    async ensName(name) {
      this.ensData = await this.getEnsData(name);
    },
  },

  methods: {
    async ensLookup(ethAddress) {
      const lookupUrl = `/api/ensLookup/${ethAddress}`;
      try {
        const lookupResponse = await axios.get(lookupUrl);
        console.log(lookupResponse);
        const name = lookupResponse.data;
        return name;
      } catch (error) {
        console.log(error);
      }
      return '';
    },
    async ensResolve(ensName) {
      const resolveUrl = `/api/ensResolve/${ensName}`;
      try {
        const resolveResponse = await axios.get(resolveUrl);
        console.log(resolveResponse);
        const address = resolveResponse.data;
        return address;
      } catch (error) {
        console.log(error);
      }
      return '';
    },
    async getEnsData(ensName) {
      const dataUrl = `/api/ensGetData/${ensName}`;
      try {
        const dataResponse = await axios.get(dataUrl);
        console.log(dataResponse);
        const address = dataResponse.data;
        return address;
      } catch (error) {
        console.log(error);
      }
      return '';
    },
  },
};
