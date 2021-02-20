const axios = require('axios').default;

export default {
  data() {
    return {
      ethBalance: '',
    };
  },
  watch: {
    async ethAddress(address) {
      console.log('asd');
      this.ethBalance = await this.getBalance(address);
    },

  },
  methods: {
    async getBalance(ethAddress) {
      console.log('yeaaa');
      const balanceUrl = `/api/getBalance/${ethAddress}`;
      console.log(balanceUrl);
      console.log(balanceUrl);
      try {
        const balanceResponse = await axios.get(balanceUrl);
        console.log(balanceResponse);
        const ethBalance = balanceResponse.data;
        return ethBalance;
      } catch (error) {
        console.log(error);
      }
      return 0;
    },

  },
};
